﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq;

using Unity;
using Unity.Attributes;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer.Extensions;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.ExceptionHandling;

using Solid.Data.DataObjects;

using Parameters = System.Collections.Generic.Dictionary<string, object>;


namespace Solid.Data.DeleteHandlers
{
	public abstract class DeleteHandlerBase<TEntity> : IDataProviderExtension<TEntity>	
		where TEntity  :  class,  GenerativeObjects.Practices.ORMSupportClasses.IDataObject
	{
		[Dependency]
		public IDataProvider<TEntity> Data { get; set; }

		[Dependency]
		public ITransactionProvider TransactionProvider { get; set; }

		protected DeleteStack DeleteStack { get; private set; }

		protected Parameters Parameters { get; private set; }

		private IDataProviderTransaction Transaction { get { return TransactionProvider.GetTransaction(Parameters); } }

		public abstract void RippleDelete(TEntity instance, Parameters parameters, DataProviderDeleteSettings settings);

		protected bool NeedResync { get; set; }

		// RippleDelete() implementations can postpone/defer deletion of related data until after the instance itself has ben resolved 
		// (e.g. ReverseCascade uses this mechanism when cascading through a ManyToMany middle entity, to ensure the many side entities are marked resolved (added to the delete stack) before the one-side entity.
		// And similarly when cascading from FK side to PK side of a OneToOne - we need to defer deletion of the PK side until after the FK side has been added to the delete stack.
		private List<IDataObject> _deferredDeleteItems = new List<IDataObject>();
		public IEnumerable<IDataObject> DeferredDeleteItems {  get { return _deferredDeleteItems; } }

		public void Init(IDataProviderExtensionProvider dataProvider)
		{
			dataProvider.OnBeforeDelete += OnBeforeDelete;
			dataProvider.OnBeforeSaveDataSet += OnBeforeSaveDataSet;
			dataProvider.OnAfterSaveDataSet += OnAfterSaveDataSet;
		}

		public void Init(Parameters parameters)
		{
			Parameters = parameters;
			DeleteStack = Parameters[ParameterKeys.DeleteStack] as DeleteStack;
		}

		private void OnBeforeDelete(object sender, OnBeforeDeleteEventArgs e)
		{
			// We're effectively disabled during actual deletion
			if (e.IsCommitPhase)
				return;

			// If we get here, we're traversing the delete graph.
			// Traversing means we're looping round doing a depth first cascade through relations, and we add each 'leaf' instance to the ordered list of objects to be deleted
			// But we're not actually goind any deleting during this phase, so we flag isHandled to block the delete at DataProvider level (means it skips the actual Delete call)
			e.IsHandled = true;

			// Initialise
			Init(e.Parameters);

			// Get the instance (e.Entity is only used to pass through the PK)
			var instance = Data.Get(e.Entity as TEntity, parameters: e.Parameters, skipSecurity: true);

			if (instance == null)
				return;

			// Ripple the delete through relations / subtypes
            var settings = new DataProviderDeleteSettings(e);
            settings.SkipSecurity = true;
            Ripple(instance, settings, e.Parameters);
		}

		private void OnBeforeSaveDataSet(object sender, OnBeforeSaveDataSetEventArgs e)
		{
			if (e.Entity.IsMarkedForDeletion)
			{
				Transaction.Join(e.Parameters, $"Delete-DataSet-IsMarkedForDeletion-{e.Entity.GetType().Name}");

				// It's possible for apps to register more than one DeleteHandler for an entity.
				// In this case, OnBeforeSaveDataSet will come through here once for each handler (i.e. through same code, but different instance, because of the TEntity genericity)
				// We can only delete an entity once... so we need to check to see if the entity has already been resolved in the delete stack before proceeding
				// Also note: Can't use this.DeleteStack because we may not be the instance that did the delete! It's safest to get it from e.Parameters, anyway.
				var deleteStack = e.Parameters.ContainsKey(ParameterKeys.DeleteStack) ? e.Parameters[ParameterKeys.DeleteStack] as DeleteStack : null;
				if (deleteStack == null || !deleteStack.IsResolved(e.Entity))
				{
					try
					{
						dynamic db = ApplicationSettings.Container.Resolve<IEntityDataProvider>().GetDataProviderForEntity(e.Entity) as IDataProvider;
						if (db != null)
							db.Delete(e.Entity, e.FilterExpression, e.Context, e.Parameters, e.SkipSecurity);

						// GRD-443
						// There may be objects in the saveset that are not IsMarkedForDeletion, but which have been cascade deleted
						// So we need to remove all deleted objects here, since otherwise the Save() will continue and the ORM will complain that we're trying to save things that no longer exist
						{
							deleteStack = e.Parameters.ContainsKey(ParameterKeys.DeleteStack) ? e.Parameters[ParameterKeys.DeleteStack] as DeleteStack : null;
							foreach (var deleted in deleteStack.Resolved)
							{
								e.Entity.ObjectsDataSet.RemoveObject(deleted);
								e.Context.RemoveObject(deleted);
							}
						}
					}
					catch (Exception ex)
					{
						Transaction.Leave(ex);
						throw;
					}
				}
			}
		}

		private void OnAfterSaveDataSet(object sender, OnAfterSaveDataSetEventArgs e)
		{
			if (e.EntityBeforeSave.IsMarkedForDeletion)
			{
				Transaction.Leave();
			}
		}

		protected void Save(TEntity instance)
		{
			if (DeleteStack.IsResolved(instance))
				return;

			var db = ApplicationSettings.Container.Resolve<IDataProvider<TEntity>>() as IDataProvider2<TEntity>;
			if (db != null)
			{ 
				db.Save(instance, new DataProviderSaveSettings { DeepDataMapping = false, Transaction = this.Transaction, SkipSecurity = true });
				NeedResync = true;
			}
		}

		protected void Save(IDataObject obj)
		{
			if (DeleteStack.IsResolved(obj))
				return;

			dynamic db = ApplicationSettings.Container.Resolve<IEntityDataProvider>().GetDataProviderForEntity(obj) as IDataProvider2;
			if (db != null)
			{
				// Save a flat clone to ensure no relations explored during the save
				db.Save(obj.Clone(recursive: false), new DataProviderSaveSettings { DeepDataMapping = false, Transaction = this.Transaction, SkipSecurity = true });
				NeedResync = true;
			}
		}

		private void Delete(IDataObject obj)
		{
			dynamic db = ApplicationSettings.Container.Resolve<IEntityDataProvider>().GetDataProviderForEntity(obj) as IDataProvider2;
			if (db != null)
			{
				db.Delete(obj, new DataProviderDeleteSettings { DeepDataMapping = false, Transaction = this.Transaction, SkipSecurity = true });
				NeedResync = true;
			}
		}

		protected TEntity Resync(TEntity instance)
		{
			if (!NeedResync)
				return instance;

			var result = Data.Get(instance, parameters: this.Parameters, skipSecurity: true);
			NeedResync = false;

			return result;
		}
		
		private void Ripple(TEntity instance, DataProviderDeleteSettings settings, Parameters parameters)
		{
			// Ripple each instance precisely once per DeleteStack traversal
			// (Note that this includes subtypes instances - i.e. the entire hierarchy is rippled from root call to RippleDelete)
			if (!DeleteStack.HasBeenRippledDuringCurrentTraversal(instance))
			{
				if (!DeleteStack.IsResolved(instance))
				{
					// Remember we've seen this instance
					DeleteStack.AddSeenObject(instance);

					// Count blockers before and after rippling in order to determine if instance can be added to the resolved list
					int numBlockers = DeleteStack.BlockersDuringCurrentTraversal.Count();

					// Call virtual Ripple
					RippleDelete(instance, parameters, settings);

					// no errors => Can delete this object => Add to the resolved list
					if (	numBlockers == DeleteStack.BlockersDuringCurrentTraversal.Count() 
						&&	!DeleteStack.HasUnresolvedDependencies(instance))
					{
						DeleteStack.MarkResolved(instance);

						// Do any deferred deletes
						DoDeferredDeletes(parameters, settings);
					}
				}
			}
		}

		protected void ReverseCascade(IDataObject item)
		{
			if (item != null)
			{
				// If item hasn't yet been seen during the current delete traversal, then defer-delete it in order that we (many side instances) are marked resolved *before* (one-side) item.
				if (!DeleteStack.HasBeenRippledDuringCurrentTraversal(item))
				{
					AddDeferredDeleteItem(item);
				}
			}
		}

		protected void AddDeferredDeleteItem(IDataObject item)
		{
			_deferredDeleteItems.Add(item);
		}

		public void AddDeferredDeleteItems(IEnumerable<IDataObject> items)
		{
			_deferredDeleteItems.AddRange(items);
		}

		private void DoDeferredDeletes(Parameters parameters, DataProviderDeleteSettings settings)
		{
			if (_deferredDeleteItems.Any())
			{
				try
				{
					foreach (var obj in _deferredDeleteItems)
					{
						dynamic db = ApplicationSettings.Container.Resolve<IEntityDataProvider>().GetDataProviderForEntity(obj) as IDataProvider;
						if (db != null)
						{
							db.Delete(obj, settings.SecurityFilterExpression, settings.Context, parameters, settings.SkipSecurity);
						}
					}
				}
				catch
				{
					_deferredDeleteItems.Clear();
					throw;
				}
			}

			_deferredDeleteItems.Clear();
		}

		protected void AddBlockage(string reason, IDataObject blocked, IDataObject blocker)
		{
			 if (DeleteStack.IsResolved(blocker))
                return;

			var blockage = new DeleteBlockage
			{
				Reason = reason,
				Blocked = blocked,
				Blocker = blocker,
				DeleteRoot = DeleteStack.RootObject,
				Parameters = this.Parameters
			};

			DeleteStack.BlockersDuringCurrentTraversal.Add(blockage);
			DeleteStack.AddUnresolvedDependency(blocked, blocker);

			// Trace
			var explain = ApplicationSettings.Container.Resolve<IDeleteBlockageExplanationProvider>();
			DeleteStack.Trace("BLOCKER: " + explain.Explain(blockage));
		}

		protected bool AddAnyBlockages<T>(string reason, TEntity instance, IEnumerable<T> dependencies) where T : IDataObject
		{
			bool blocked = false;

			foreach (var item in dependencies)
			{
				if (!DeleteStack.IsResolved(item))
				{
					blocked = true;
					AddBlockage(reason, instance, item);
				}
			}

			return blocked;
		}

		private void CheckResolved(IDataObject instanceBeingDeleted, IDataObject dependency)
		{
			if (!DeleteStack.IsResolved(dependency))
			{
				AddBlockage("Unresolved dependency", instanceBeingDeleted, dependency);
				DeleteStack.AddUnresolvedDependency(instanceBeingDeleted, dependency);
			}
		}

		protected void Delete<T>(T item, Parameters parameters, DataProviderDeleteSettings settings, TEntity currentInstance) where T : IDataObject
		{
			if (!DeleteStack.IsResolved(item))
			{
				var db = ApplicationSettings.Container.Resolve<IDataProvider<T>>();
				db.Delete(item, settings.SecurityFilterExpression, settings.Context, parameters, settings.SkipSecurity);
				CheckResolved(currentInstance, item);
				NeedResync = true;
			}
		}
	}

	public class DefaultDeleteBlockageExplainer : IDeleteBlockageExplanationProvider
	{
		public virtual string Explain(DeleteBlockage blockage)
		{
			return DefaultExplanation(blockage);
		}

		protected string DefaultExplanation(DeleteBlockage blockage)
		{
			return string.Format(
				"Unable to delete {0} while there are referencing {1} items, reason: {2}<br/>",
				blockage.Blocked.GetType().Name.Replace("DataObject", ""),
				blockage.Blocker.GetType().Name.Replace("DataObject", ""),
				blockage.Reason
			);
		}
	}
}


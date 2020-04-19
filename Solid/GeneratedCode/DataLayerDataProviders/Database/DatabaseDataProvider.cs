﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Unity;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.ORMSupportClasses.NHibernate;
using GenerativeObjects.Practices.Logging;
using GenerativeObjects.Practices.ExceptionHandling;
using Solid.Data.DataObjects;

using Parameters = System.Collections.Generic.Dictionary<string, object>;

namespace Solid.Data.DataProviders.Database
{
    public abstract class DatabaseDataProvider<TENTITY> : DataProvider<TENTITY> where TENTITY : class, IDataObject
    {
        protected static bool HasDatabaseDataSource(IDataObject entity)
        {
			return (entity is GOGroupRoleDataObject || entity is GOUserDataObject || entity is GOGroupDataObject || entity is GOUserRoleDataObject || entity is GOUserGroupDataObject || entity is GOLoginHistoryDataObject);
		}

        // filterExpression is used to filter data, when filter is statically known. dynamicFilterExpression is used for dynamic filtering, when filter is not known at compile time. Both can be used at the same time
		protected abstract int DoCountFromDatabase(LambdaExpression filterExpression, string dynamicFilterExpression, object[] dynamicFilterArguments, IObjectsDataSet context, Parameters parameters);
        // securityFilterExpression is for security : check if the user is allowed to delete the entity
        protected abstract void DoDeleteFromDatabase(TENTITY entity, LambdaExpression securityFilterExpression, IObjectsDataSet context, Parameters parameters);
        // securityFilterExpression is for security : check if the user is allowed to read the entity
        protected abstract TENTITY DoGetFromDatabase(TENTITY entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Parameters parameters);
        // filterExpression is used to filter data, when filter is statically known. dynamicFilterExpression is used for dynamic filtering, when filter is not known at compile time. Both can be used at the same time
        protected abstract DataObjectCollection<TENTITY> DoGetCollectionFromDatabase(LambdaExpression filterExpression, string dynamicFilterExpression, object[] dynamicFilterArguments, string orderByPredicate, int pageNumber, int pageSize, List<string> includes, IObjectsDataSet context, Parameters parameters);
       
        protected virtual TENTITY DoSaveToDatabase(
			TENTITY entity, 
			List<string> includes, 
			IObjectsDataSet context, 
			Parameters parameters)
		{
			// Ensure got a dataset
			if (entity.ObjectsDataSet == null)
				entity.ObjectsDataSet = ApplicationSettings.Resolve<IObjectsDataSet>();

			// Ensure entity is in its own dataset
			var self = entity.ObjectsDataSet.GetObject(entity);
			if (self == null)
				entity.ObjectsDataSet.AddObject(entity);

			// Note: We can skip objects marked for deletion, because before arriving here, the delete resolution algorithm will already have processed them 
			// Wee just need to remove the marked-for-deletion objects so that they aren't mapped or returned to caller
			foreach (var deletedObj in entity.ObjectsDataSet.GetObjectsMarkedForDeletion().ToArray())
			{
				entity.ObjectsDataSet.RemoveObject(deletedObj);

				// Remove from the context too 
				if (context != null)
					context.RemoveObject(deletedObj);
			}

			// Get data mapping setting from the parameters (deep is the default)
			// Deep mapping means we'll explore all relations, else will only treat the specified entity (i.e. a 'flat' single entity save)
			bool deepMapping = parameters == null || !parameters.ContainsKey(ParameterKeys.DeepDataMapping) || (bool)parameters[ParameterKeys.DeepDataMapping] == true;

			// entity returned from SaveToDatabaseThroughORM can be null (e.g. if nothing dirty/new in the saveset, or if deleted)
			entity = SaveToDatabaseThroughORM(entity, deepMapping);

			// for the refetch, security can be skipped if no related data requested (since we just wrote it, it's just a flat re-sync)
			bool canRefetchSkipSecurity = includes == null || !includes.Any() || ParameterKeys.IsOptionEnabled(parameters, ParameterKeys.ORMSaveRefetchSkipSecurity);
			return entity == null ? null : Get(entity, includes: includes, parameters: parameters, skipSecurity: canRefetchSkipSecurity);
		}

		/// Does the Save or Update through the ORM and returns an entity instance with any database generated PK assigned
		/// Note: We don't support databse generated composite keys - best avoided.
		private TENTITY SaveToDatabaseThroughORM(TENTITY entity, bool deepMapping)
		{
			TENTITY result = null;

			var session = NHibernateSessionController.GetCurrentSession();

			if (entity.ObjectsDataSet.GetAllObjects().Count(o => o.IsDirty || o.IsNew) == 0)
			{
				return entity;
			}
			else
			{
				object newPK = null;

				if (deepMapping)
				{
					// Deep mapping is implemented as a dependency graph resolution via ISaveDependencyResolver
					// Note: This means if a client application has a specific known dependency that the default implemenation fails to resolve, you can hook your own implementation in here
					// (e.g. call the default one, and then adjust the result)
					var saveList = ApplicationSettings.Resolve<ISaveDependencyResolver>().Sort(entity.ObjectsDataSet);
					foreach (var obj in saveList)
					{
						newPK = SaveOrUpdateThroughORM(session, obj, isMainEntity: ReferenceEquals(obj, entity));
					}
				}
				else
				{
					newPK = SaveOrUpdateThroughORM(session, entity, isMainEntity: true);
				}

				if (newPK != null)
				{
					result = (TENTITY)entity.Clone(recursive: false);
					result.AssignPrimaryKey(newPK);
				}
			}

			return result ?? entity;
		}

		/// if obj.IsNew, returns any database generated PK, or else the already-assigned PK
		private object SaveOrUpdateThroughORM(NHibernate.ISession session, IDataObject obj, bool isMainEntity = false)
		{
			object newPK = null;

			var toSave = obj.ToORMEntity();

			if (obj.IsNew)
			{
				var pk = session.Save(toSave);

				if (isMainEntity)
				{
					newPK = pk;
				}
			}
			else
			{
				session.Update(toSave);
			}

			return newPK;
		}

        static ILogEngine _logEngine = ApplicationSettings.Container.Resolve<ILogEngine>();

        // filterExpression is used to filter data, when filter is statically known. dynamicFilterExpression is used for dynamic filtering, when filter is not known at compile time. Both can be used at the same time
        protected override int DoCount(LambdaExpression filterExpression, string dynamicFilterExpression, object[] dynamicFilterArguments, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            Int32 toReturn;

			var transaction = EnsureTransaction(parameters);
			var transactInfo = transaction == null ? null : new TransactionParticipant { Who = this, Id = Guid.NewGuid().ToString(), Info = "DoCount(" + typeof(TENTITY).Name + ")" };
			transaction.Join(parameters, "DoCount", transactInfo);

            try
            {
                toReturn = DoCountFromDatabase(filterExpression, dynamicFilterExpression, dynamicFilterArguments, context, parameters);
            }
			catch (Exception e)
			{
				transaction.Leave(e, transactInfo);
				throw;
			}
			
			transaction.Leave(null, transactInfo);

            return toReturn;
        }

        // securityFilterExpression is for security : check if the user is allowed to delete the entity
        protected override void DoDelete(TENTITY entity, LambdaExpression securityFilterExpression, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
			var transaction = EnsureTransaction(parameters);
			var transactInfo = transaction == null ? null : new TransactionParticipant { Who = this, Id = Guid.NewGuid().ToString(), Info = "DoDelete(" + typeof(TENTITY).Name + ")" };	
			transaction.Join(parameters, "DoDelete", transactInfo);

            try
            {
                var entityToDelete = DoGet(entity, securityFilterExpression, null, context, parameters);

				// Don't throw ResourceNotFoundException during a Delete: If the resource isn't there, then that's what we want, stay quiet
				if (entityToDelete != null)
				{
					DoDeleteFromDatabase(entityToDelete, securityFilterExpression, context, parameters);
				}
            }
			catch (Exception e)
			{
				transaction.Leave(e, transactInfo);	
				throw;
			}
			
			transaction.Leave(null, transactInfo);
        }

        // securityFilterExpression is for security : check if the user is allowed to read the entity
        protected override TENTITY DoGet(TENTITY entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            TENTITY result;
            
			var transaction = EnsureTransaction(parameters);
			var transactInfo = transaction == null ? null : new TransactionParticipant { Who = this, Id = Guid.NewGuid().ToString(), Info = "DoGet(" + typeof(TENTITY).Name + ")" };
			transaction.Join(parameters, "DoGet", transactInfo);

            try
            {
                result = DoGetFromDatabase(entity, securityFilterExpression, includes, context, parameters);
            }
			catch (Exception e)
			{
				transaction.Leave(e, transactInfo);
				throw;
			}
			
			transaction.Leave(null, transactInfo);

            return result;
        }

        // filterExpression is used to filter data, when filter is statically known. dynamicFilterExpression is used for dynamic filtering, when filter is not known at compile time. Both can be used at the same time
        protected override DataObjectCollection<TENTITY> DoGetCollection(LambdaExpression filterExpression, string dynamicFilterExpression, object[] dynamicFilterArguments, string orderByPredicate, int pageNumber, int pageSize, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            DataObjectCollection<TENTITY> toReturn;

			var transaction = EnsureTransaction(parameters);
			var transactInfo = transaction == null ? null : new TransactionParticipant { Who = this, Id = Guid.NewGuid().ToString(), Info = "DoGetCollection(" + typeof(TENTITY).Name + ")" };			
			transaction.Join(parameters, "DoGetCollection", transactInfo);

            try
            {
                toReturn = DoGetCollectionFromDatabase(filterExpression, dynamicFilterExpression, dynamicFilterArguments, orderByPredicate,  pageNumber, pageSize, includes, context, parameters);
            }
			catch (Exception e)
			{
				transaction.Leave(e, transactInfo);
				throw;
			}
			
			transaction.Leave(null, transactInfo);

            return toReturn;
        }

        // securityFilterExpression no longer checked here - has already been checked higher up the stack
        protected override TENTITY DoSave(TENTITY entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            TENTITY toReturn;
			
			var transaction = EnsureTransaction(parameters);
			var transactInfo = transaction == null ? null : new TransactionParticipant { Who = this, Id = Guid.NewGuid().ToString(), Info = "DoSave(" + typeof(TENTITY).Name + ")" };
			transaction.Join(parameters, "DoSave", transactInfo);

            try
            {
				toReturn = DoSaveToDatabase(entity, includes, context, parameters);
            }
			catch (Exception e)
			{
				transaction.Leave(e, transactInfo);
				throw;
			}
			
			transaction.Leave(null, transactInfo);

            return toReturn;
        }

		private DatabaseDataProviderTransaction EnsureTransaction(Parameters parameters)
		{
			if (parameters == null)
				parameters = new Parameters();

			var transaction = ApplicationSettings.Resolve<ITransactionProvider>().GetTransaction(parameters) as DatabaseDataProviderTransaction;

			if (transaction == null)
				transaction = ApplicationSettings.Resolve<ITransactionProvider>().NewTransaction(parameters) as DatabaseDataProviderTransaction;

			return transaction;
		}

		public static Type GetConcreteEntityDatabaseProvider(IDataObject entity)
		{
			Type entityDataProviderType = null;

			switch (entity.GetType().Name)
			{
			case "GOGroupRoleDataObject":
				entityDataProviderType = typeof(GOGroupRoleDataProvider);
				break;
			case "GOUserDataObject":
				entityDataProviderType = typeof(GOUserDataProvider);
				break;
			case "GOGroupDataObject":
				entityDataProviderType = typeof(GOGroupDataProvider);
				break;
			case "GOUserRoleDataObject":
				entityDataProviderType = typeof(GOUserRoleDataProvider);
				break;
			case "GOUserGroupDataObject":
				entityDataProviderType = typeof(GOUserGroupDataProvider);
				break;
			case "GOLoginHistoryDataObject":
				entityDataProviderType = typeof(GOLoginHistoryDataProvider);
				break;
			}

			return entityDataProviderType;
		}
    }

	public static class DispatchPath
	{
		// Given a relation, find all subinclude paths in includes
		public static List<string> GetSubIncludes(string relation, IEnumerable<string> includes)
		{
			var result = new List<string>();

			relation = relation.ToLower();

			foreach (var include in includes)
			{
				var includeparts = include.Split('.').Select(s => s.ToLower()).ToArray();

				if (includeparts[0] == relation)
				{
					if (includeparts.Length > 1)
					{
						string subInclude = String.Join(".", includeparts.Skip(1));
						result.Add(subInclude);
					}

				}
			}

			return result;
		}
	}

	public class DatabaseEntityProvider : IEntityDataProvider
	{
		public IDataProvider GetDataProviderForEntity(IDataObject entity)
		{
			switch (entity.GetType().Name)
			{
			case "GORoleDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<GORoleDataObject>>();
			case "VisitedPlaceDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<VisitedPlaceDataObject>>();
			case "GOGroupRoleDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<GOGroupRoleDataObject>>();
			case "PlaceDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<PlaceDataObject>>();
			case "UserProfileDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<UserProfileDataObject>>();
			case "LocationDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<LocationDataObject>>();
			case "PlaceToLocationDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<PlaceToLocationDataObject>>();
			case "GOUserDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<GOUserDataObject>>();
			case "GOGroupDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<GOGroupDataObject>>();
			case "GOUserRoleDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<GOUserRoleDataObject>>();
			case "CountryDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<CountryDataObject>>();
			case "GOUserGroupDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<GOUserGroupDataObject>>();
			case "GOLoginHistoryDataObject":
				return ApplicationSettings.Container.Resolve<IDataProvider<GOLoginHistoryDataObject>>();
			default:
				break;
			}

			return null;
		}
	}
}

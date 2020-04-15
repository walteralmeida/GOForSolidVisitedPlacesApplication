﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
////////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.ORMSupportClasses.NHibernate;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;

namespace Solid.Data.DataObjects
{
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Bridge ORMEntity -> DataObject
	//
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	[Serializable]
	public class ORMGOUserRole : IORMEntity 
	{
		public ORMGOUserRole()
		{
			CompositeIdentity = new CompositeKeyForGOUserRole();
		}

		public virtual CompositeKeyForGOUserRole CompositeIdentity { get; set; }
 
		///
		/// All Persistent non-key fields
		///
 
		///
		/// PK-Side one-to-one relations
		///
 
		///
		/// All FK-Side Relations
		///
		public virtual ORMGOUser User 
		{ 
			get { return  CompositeIdentity.User; }
			set { CompositeIdentity.User = value; }
		}
		public virtual System.Guid GOUserId 
		{ 
			get { return  CompositeIdentity.GOUserId; }
			set { CompositeIdentity.GOUserId = value; }
		}
		// Note: GORole is not mapped to the database, so we only map the FK
		public virtual System.String GORoleName 
		{ 
			get { return  CompositeIdentity.GORoleName; }
			set { CompositeIdentity.GORoleName = value; }
		}
	
		
		///
		/// Composite PK routings
		///
 
		///
		/// PK-Side one-to-many relations
		///
 
		///
		/// Bridge to DataObject
		///
		public virtual IDataObject ToDataObject(IObjectsDataSet dataset)
		{
            var session = NHibernateSessionController.GetCurrentSession();
            session.Evict(this);

			var x = new GOUserRoleDataObject();
			
			SetProperties(x);

			x.IsDirty = x.IsNew = x.IsMarkedForDeletion = false;

			x.ObjectsDataSet = dataset;
			x.ObjectsDataSet.AddObjectIfDoesNotExist(x);

			// Deep-map prefetch relations
			if (PrefetchAssociations.HasPrefetchForEntity("GOUserRole", ApplicationSettings.Resolve<IDataProviderTransaction>()?.Parameters))
			{
				SetRelations(x);
			}

			return x;
		}

		protected void SetProperties(GOUserRoleDataObject x)
		{
			x.SetGOUserIdValue(this.GOUserId, false, false);
			x.SetGORoleNameValue(this.GORoleName, false, false);
		}

		protected void SetRelations(GOUserRoleDataObject x)
		{
			var prefetches = PrefetchAssociations.Get("GOUserRole", ApplicationSettings.Resolve<IDataProviderTransaction>()?.Parameters);

			if (prefetches.Contains("User") && this.User != null)
			{
				var user = x.ObjectsDataSet.GetObject(new GOUserDataObject((System.Guid)this.User.Id) { IsNew = false });

				if (user == null)
					user = this.User.ToDataObject(x.ObjectsDataSet) as GOUserDataObject;

				x.SetUserValue(user);
			}

		}
		
		// For database filtering, nothing IsNew or IsDirty, but these stubs needed for ORM security predicates to compile
		public virtual bool IsNew => false;
		public virtual bool IsDirty => false;

		////////////////////////////////////////////////////////////////////////////////////////////////
		///
		/// Composite Keys - keep NHibernate happy
		/// See https://nhibernate.info/doc/nhibernate-reference/components.html#components-compositeid section 8.4
		///
		////////////////////////////////////////////////////////////////////////////////////////////////
		public override bool Equals(object obj)
		{
			return CompositeIdentity.Equals((obj as ORMGOUserRole)?.CompositeIdentity);
		}

		public override int GetHashCode()
		{
			return CompositeIdentity.GetHashCode();
		}
	}
 
	[Serializable]
	public class CompositeKeyForGOUserRole 
	{
		private bool HasForeignKeyForRelation_User 
		{
			get
			{
				return 
					_GOUserId != default(System.Guid); 
			}
		}		
		private ORMGOUser LoadUser()
		{
			if (_User != null)
				return _User;

			if (!HasForeignKeyForRelation_User)
				return null;

			var session = NHibernateSessionController.GetCurrentSession();
			return session.Load<ORMGOUser>(_GOUserId);
		}

		private ORMGOUser _User;
		public ORMGOUser User 
		{ 
			get
			{
				if (_User == null)
				{
					_User = LoadUser();
				}

				return _User;
			}
			set
			{
				_User = value;

				_GOUserId = _User == null ? default(System.Guid) : _User.Id;
			}
		}

		private System.Guid _GOUserId;
		public System.Guid GOUserId 
		{
			get
			{
				return _GOUserId;
			}
			set
			{
				if (_User != null)
				{
					_User.Id = value;
				}
					
				_GOUserId = value;
			}
		}

		private bool HasForeignKeyForRelation_Role 
		{
			get
			{
				return 
					GORoleName != default(System.String); 
			}
		}		
		public System.String GORoleName { get; set; }

 
		public override bool Equals(object obj)
		{
			var other = obj as CompositeKeyForGOUserRole;
			if (other != null)
			{
				return this.GetType() == other.GetType() && this.GORoleName == other.GORoleName && this.GOUserId == other.GOUserId;
			}

			return false;
		}

		public override int GetHashCode()
		{
			return GetType().Name.GetHashCode()
					^ (GORoleName == null ? 0 : GORoleName.GetHashCode()) 
					^ (GOUserId == null ? 0 : GOUserId.GetHashCode()) 
				;
		}
	}
}
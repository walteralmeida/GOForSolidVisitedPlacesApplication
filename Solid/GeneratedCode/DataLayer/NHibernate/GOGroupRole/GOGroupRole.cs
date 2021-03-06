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
	public class ORMGOGroupRole : IORMEntity 
	{
		public ORMGOGroupRole()
		{
			CompositeIdentity = new CompositeKeyForGOGroupRole();
		}

		public virtual CompositeKeyForGOGroupRole CompositeIdentity { get; set; }
 
		///
		/// All Persistent non-key fields
		///
 
		///
		/// PK-Side one-to-one relations
		///
 
		///
		/// All FK-Side Relations
		///
		// Note: GORole is not mapped to the database, so we only map the FK
		public virtual System.String GORoleName 
		{ 
			get { return  CompositeIdentity.GORoleName; }
			set { CompositeIdentity.GORoleName = value; }
		}
		public virtual ORMGOGroup Group 
		{ 
			get { return  CompositeIdentity.Group; }
			set { CompositeIdentity.Group = value; }
		}
		public virtual System.String GOGroupName 
		{ 
			get { return  CompositeIdentity.GOGroupName; }
			set { CompositeIdentity.GOGroupName = value; }
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

			var x = new GOGroupRoleDataObject();
			
			SetProperties(x);

			x.IsDirty = x.IsNew = x.IsMarkedForDeletion = false;

			x.ObjectsDataSet = dataset;
			x.ObjectsDataSet.AddObjectIfDoesNotExist(x);

			// Deep-map prefetch relations
			if (PrefetchAssociations.HasPrefetchForEntity("GOGroupRole", ApplicationSettings.Resolve<IDataProviderTransaction>()?.Parameters))
			{
				SetRelations(x);
			}

			return x;
		}

		protected void SetProperties(GOGroupRoleDataObject x)
		{
			x.SetGORoleNameValue(this.GORoleName, false, false);
			x.SetGOGroupNameValue(this.GOGroupName, false, false);
		}

		protected void SetRelations(GOGroupRoleDataObject x)
		{
			var prefetches = PrefetchAssociations.Get("GOGroupRole", ApplicationSettings.Resolve<IDataProviderTransaction>()?.Parameters);

			if (prefetches.Contains("Group") && this.Group != null)
			{
				var group = x.ObjectsDataSet.GetObject(new GOGroupDataObject((System.String)this.Group.Name) { IsNew = false });

				if (group == null)
					group = this.Group.ToDataObject(x.ObjectsDataSet) as GOGroupDataObject;

				x.SetGroupValue(group);
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
			return CompositeIdentity.Equals((obj as ORMGOGroupRole)?.CompositeIdentity);
		}

		public override int GetHashCode()
		{
			return CompositeIdentity.GetHashCode();
		}
	}
 
	[Serializable]
	public class CompositeKeyForGOGroupRole 
	{
		private bool HasForeignKeyForRelation_Role 
		{
			get
			{
				return 
					GORoleName != default(System.String); 
			}
		}		
		public System.String GORoleName { get; set; }

		private bool HasForeignKeyForRelation_Group 
		{
			get
			{
				return 
					_GOGroupName != default(System.String); 
			}
		}		
		private ORMGOGroup LoadGroup()
		{
			if (_Group != null)
				return _Group;

			if (!HasForeignKeyForRelation_Group)
				return null;

			var session = NHibernateSessionController.GetCurrentSession();
			return session.Load<ORMGOGroup>(_GOGroupName);
		}

		private ORMGOGroup _Group;
		public ORMGOGroup Group 
		{ 
			get
			{
				if (_Group == null)
				{
					_Group = LoadGroup();
				}

				return _Group;
			}
			set
			{
				_Group = value;

				_GOGroupName = _Group == null ? default(System.String) : _Group.Name;
			}
		}

		private System.String _GOGroupName;
		public System.String GOGroupName 
		{
			get
			{
				return _GOGroupName;
			}
			set
			{
				if (_Group != null)
				{
					_Group.Name = value;
				}
					
				_GOGroupName = value;
			}
		}

 
		public override bool Equals(object obj)
		{
			var other = obj as CompositeKeyForGOGroupRole;
			if (other != null)
			{
				return this.GetType() == other.GetType() && this.GOGroupName == other.GOGroupName && this.GORoleName == other.GORoleName;
			}

			return false;
		}

		public override int GetHashCode()
		{
			return GetType().Name.GetHashCode()
					^ (GOGroupName == null ? 0 : GOGroupName.GetHashCode()) 
					^ (GORoleName == null ? 0 : GORoleName.GetHashCode()) 
				;
		}
	}
}
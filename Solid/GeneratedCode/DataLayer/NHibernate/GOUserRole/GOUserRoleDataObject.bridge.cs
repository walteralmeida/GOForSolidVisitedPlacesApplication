﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
////////////////////////////////////////////////////////////////////////////////////////////
using System;
using System.Linq;
using System.Collections.Generic;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.ORMSupportClasses.NHibernate;

namespace Solid.Data.DataObjects
{
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Bridge DataObject -> ORMEntity
	//
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	public partial class GOUserRoleDataObject
	{
		public override IORMEntity ToORMEntity()
		{
			var session = NHibernateSessionController.GetCurrentSession();

			var result = new ORMGOUserRole(); 
			CopyTo(result, session);

			// Ensure no copy of result (instance with same key) in session
			Evict(result, session);

			return result;
		}

		protected void CopyTo(ORMGOUserRole x, NHibernate.ISession session)
		{
				
			x.User = this.User != null ? session.Load<ORMGOUser>(this.User.Id) : (this.GOUserId != null ? session.Load<ORMGOUser>(this.GOUserId) : null);
			x.GOUserId = this.User != null ? this.User.Id : GOUserId; 
			x.GORoleName = this.Role != null ? this.Role.Name : GORoleName; 
		}
 
		private void Evict(ORMGOUserRole result, NHibernate.ISession session)
		{
			foreach (var entity in session.GetSessionImplementation().PersistenceContext.EntitiesByKey.Values.ToArray())
			{
				var evictee = entity as ORMGOUserRole;

				if (evictee != null && evictee.CompositeIdentity.Equals(result.CompositeIdentity))
				{
					session.Evict(evictee);
				}
			}
		}

	}
}
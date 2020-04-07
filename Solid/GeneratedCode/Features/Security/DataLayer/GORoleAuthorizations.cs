﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Security.Common;
using Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Solid.Data.DataObjects;
using Solid.Feature.Security.Common;
using Solid.Data.DataProviders.Database;

namespace Solid.Features.Security
{
	/* 
		Summary of the permissioning logic:
		User is in at least one authorizing role for the resource => authorised
		All User roles are denied access to the resource => denied
		Else the default access setting for the resource is used. (so e.g. if no rules for this role, or if not all roles explicitly denied, then the default is used)
	*/
    public class GORoleAuthorizations : IGORoleAuthorizations
    {
		public Authorizations Authorizations => ApplicationSettings.Container.Resolve<IAuthorizations>() as Authorizations;

		public string EntityDisplayName => "GORole";

		public PermissionLevel CanCreate(IDataObject entity, UserClaims claims, out string message, out SecurityPredicate predicate)
        {
			message = null;
			predicate = null;
			return PermissionLevel.NotSet;
		}

		public PermissionLevel CanRead(IDataObject entity, UserClaims claims, out string message, out SecurityPredicate predicate)
        {
			message = null;
			predicate = null;
			return PermissionLevel.NotSet;
		}

		public PermissionLevel CanUpdate(IDataObject entity, UserClaims claims, out string message, out SecurityPredicate predicate)
        {
			message = null;
			predicate = null;
			return PermissionLevel.NotSet;
		}

		public PermissionLevel CanDelete(IDataObject entity, UserClaims claims, out string message, out SecurityPredicate predicate)
        {
			message = null;
			predicate = null;
			return PermissionLevel.NotSet;
		}

	}
}

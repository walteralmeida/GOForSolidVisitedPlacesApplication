﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using GenerativeObjects.Practices.Settings;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer.Extensions;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Security.Common;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses;
using Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic;
using GenerativeObjects.Practices.ExceptionHandling;
using Solid.Data.DataObjects;
using Solid.Feature.Security.Common;
using Solid.BusinessLayer.ORMSupportClasses;


namespace Solid.Features.Security.DataProviders
{
    public class GOUserDataProviderSecurityExtension : IDataProviderExtension<GOUserDataObject>
    {
        public void Init(IDataProviderExtensionProvider dataProvider)
        {
            dataProvider.OnBeforeSave += OnBeforeSave;
            dataProvider.OnBeforeDelete += OnBeforeDelete;
            dataProvider.OnBeforeCount += OnBeforeCount;
            dataProvider.OnBeforeGet += OnBeforeGet;
            dataProvider.OnBeforeGetCollection += OnBeforeGetCollection;        
		}
        void OnBeforeGetCollection(object sender, OnBeforeGetCollectionEventArgs e)
        {
			if (e.SkipSecurity)
				return;

			string message = null;
			SecurityPredicate predicate = null;

            var authentication = ApplicationSettings.Container.Resolve<IAuthentication>();
            var claims = authentication.GetCurrentUserClaims();
            var permissionLevel = ApplicationSettings.Container.Resolve<IAuthorizations>().CanRead(new GOUserDataObject(), claims, out message, out predicate);

			if (permissionLevel != PermissionLevel.Authorized)
				authentication.ThrowAccessDenied(new GOServerException("accessDenied", String.IsNullOrEmpty(message) ? "unauthorized access" : message, new ForbiddenAccessException("forbidden access")));

			// If there is filter defined => add it to existing predicate
            if (predicate != null)
            {
                e.FilterExpression = predicate.Filter;
            }
		}

        void OnBeforeGet(object sender, OnBeforeGetEventArgs e)
        {
			if (e.SkipSecurity)
				return;

            var authentication = ApplicationSettings.Container.Resolve<IAuthentication>();
            var claims = authentication.GetCurrentUserClaims();

			string message = null;
			SecurityPredicate predicate = null;

            var permissionLevel = ApplicationSettings.Container.Resolve<IAuthorizations>().CanRead(e.Entity, claims, out message, out predicate);
        
			if (permissionLevel != PermissionLevel.Authorized)
				authentication.ThrowAccessDenied(new GOServerException("accessDenied", String.IsNullOrEmpty(message) ? "unauthorized access" : message, new ForbiddenAccessException("forbidden access")));

			// If there is filter defined => we should verify the data accessed complies with the filter
			if (predicate != null)
            {
				e.FilterExpression = predicate.Filter;
            }
		}

        void OnBeforeCount(object sender, OnBeforeCountEventArgs e)
        {
			if (e.SkipSecurity)
				return;

            var authentication = ApplicationSettings.Container.Resolve<IAuthentication>();
            var claims = authentication.GetCurrentUserClaims();

			string message = null;
			SecurityPredicate predicate = null;

			var permissionLevel = ApplicationSettings.Container.Resolve<IAuthorizations>().CanRead(new GOUserDataObject(), claims, out message, out predicate);

			if (permissionLevel != PermissionLevel.Authorized)
				authentication.ThrowAccessDenied(new GOServerException("accessDenied", String.IsNullOrEmpty(message) ? "unauthorized access" : message, new ForbiddenAccessException("forbidden access")));

			// If there is filter defined => add it to existing predicate
            if (predicate != null)
            {
                e.FilterExpression = predicate.Filter;
            }
		}

        void OnBeforeDelete(object sender, OnBeforeDeleteEventArgs e)
        {
			if (e.SkipSecurity)
				return;

			// Security is applied during delete traversal stage only (since predicates require relations to be loaded etc, can't work during commit phase)
			if (e.IsCommitPhase)
				return;

            var authentication = ApplicationSettings.Container.Resolve<IAuthentication>();
            var claims = authentication.GetCurrentUserClaims();

			string message = null;
			SecurityPredicate predicate = null;

			var permissionLevel = ApplicationSettings.Container.Resolve<IAuthorizations>().CanDelete(e.Entity, claims, out message, out predicate);

			if (permissionLevel != PermissionLevel.Authorized)
				authentication.ThrowAccessDenied(new GOServerException("accessDenied", String.IsNullOrEmpty(message) ? "unauthorized access" : message, new ForbiddenAccessException("forbidden access")));

			// If there is filter defined => we should verify the data accessed complies with the filter
			if (predicate != null)
            {
				e.FilterExpression = predicate.Filter;
            }
        }

        void OnBeforeSave(object sender, OnBeforeSaveEventArgs e)
        {
			if (e.SkipSecurity)
				return;

            var authentication = ApplicationSettings.Container.Resolve<IAuthentication>();
            var claims = authentication.GetCurrentUserClaims();

            var dataset = e.Entity.ObjectsDataSet as ObjectsDataSet;

			string message;

			if (AppSettings.Get<bool>("DataSetAuthorizationCheckModeRemoveFromDataSet"))
			{
				// If 'remove from dataset' option is enabled, do an explicit check of the main entity first
				// so that we don't just quietly skip saves of the context/main entity
				SecurityPredicate predicate;
				var permissionLevel = ApplicationSettings.Container.Resolve<IAuthorizations>().CanUpdate(e.Entity, claims, out message, out predicate);

				if (permissionLevel != PermissionLevel.Authorized)
					authentication.ThrowAccessDenied(new GOServerException("accessDenied", String.IsNullOrEmpty(message) ? "unauthorized access" : message, new ForbiddenAccessException("forbidden access")));
			}

			// Perform authorization check on full dataset because could embed multiple saves and deletes
			{
				var permissionLevel = ApplicationSettings.Container.Resolve<IAuthorizations>().CheckWriteAuthorizationsOnDataSet(dataset, claims, e.Parameters, out message);

				if (permissionLevel != PermissionLevel.Authorized)
					authentication.ThrowAccessDenied(new GOServerException("accessDenied", String.IsNullOrEmpty(message) ? "unauthorized access" : message, new ForbiddenAccessException("forbidden access")));
			}

			// Note that because Save() may involve multiple save / deletes in a single savesset, we do not set e.FiltrExpression here
			// (because there may be a different security data filter for different entities in the saveset)
			// instead, the CheckWriteAuthorizationsOnDataSet has already checked the filter(s) (for the entire dataset)
        }
    }
} 

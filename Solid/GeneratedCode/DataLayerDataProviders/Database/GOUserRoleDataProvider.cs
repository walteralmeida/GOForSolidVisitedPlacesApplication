﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using Unity;
using NHibernate;
using NHibernate.Linq;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.ORMSupportClasses.NHibernate;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Security.Common;
using GenerativeObjects.Practices.ExceptionHandling;
using GenerativeObjects.Practices.LayerSupportClasses;
using Solid.Data.DataObjects;

using Parameters = System.Collections.Generic.Dictionary<string, object>;


namespace Solid.Data.DataProviders.Database
{
    public class GOUserRoleDataProvider : DatabaseDataProvider<GOUserRoleDataObject>
    {
	    // filterExpression is used to filter data, when filter is statically known. dynamicFilterExpression is used for dynamic filtering, when filter is not known at compile time. Both can be used at the same time
        protected override int DoCountFromDatabase(
			LambdaExpression filterExpression, 
			string dynamicFilterExpression, 
			object[] dynamicFilterArguments, 
			IObjectsDataSet context, 
			Parameters parameters)
        {
			var query = Query(dynamicFilterExpression, dynamicFilterArguments, filterExpression);

			// Put the query in the transaction parameters so that custom data provider OnAfterCount extensions can see the result set
			if (parameters != null)
				 parameters[ParameterKeys.DataProviderCountQuery] = query;

			return query.Count();
        }

        protected override void DoDeleteFromDatabase(
			GOUserRoleDataObject entity, 
			LambdaExpression filterExpression,			// no longer used here - handled higher up the stack by dataprovider extensions
			IObjectsDataSet context, 
			Parameters parameters)
        {
			var session = NHibernateSessionController.GetCurrentSession();
			var toDelete = entity.ToORMEntity();
			session.Delete(toDelete);
        }

        // securityFilterExpression is for security : check if the user is allowed to read the entity
        protected override GOUserRoleDataObject DoGetFromDatabase(
			GOUserRoleDataObject entity, 
			LambdaExpression securityFilterExpression, 
			List<string> includes, 
			IObjectsDataSet context, 
			Parameters parameters)
        {
			var securityFilter = securityFilterExpression as Expression<Func<ORMGOUserRole, bool>>;

			var query = Query(
				e => e.GORoleName == entity.GORoleName && e.GOUserId == entity.GOUserId, 
				null,
				null,
				securityFilter, 
				throwIfAccessDenied: true);

			// Normal (default generated) behaviour is: 
			// includes not treated by orm but with dispatcher mechanism to allow for proper security and extension calls on all objects
			// But the following allows custom implementations to prefetch associations
			ApplicationSettings.TryResolve<IPrefetch<ORMGOUserRole>>()?.Fetch(query, includes, parameters);

			var dataset = ApplicationSettings.Resolve<IObjectsDataSet>();
			var result = query.FirstOrDefault()?.ToDataObject(dataset) as GOUserRoleDataObject;

			return result;
        }

        // filterExpression is used to filter data, when filter is statically known. dynamicFilterExpression is used for dynamic filtering, when filter is not known at compile time. Both can be used at the same time
        protected override DataObjectCollection<GOUserRoleDataObject> DoGetCollectionFromDatabase(
			LambdaExpression filterExpression, 
			string dynamicFilterExpression, 
			object[] dynamicFilterArguments, 
			string orderByPredicate, 
			int pageNumber, 
			int pageSize, 
			List<string> includes, 
			IObjectsDataSet context, 
			Parameters parameters)
        {
			var query = Query(dynamicFilterExpression, dynamicFilterArguments, filterExpression);

			if (!String.IsNullOrEmpty(orderByPredicate))
				query = query.OrderBy(orderByPredicate);

			// Normal (default generated) behaviour is: 
			// includes not treated by orm but with dispatcher mechanism to allow for proper security and extension calls on all objects
			// But the following allows custom implementations to prefetch associations
			ApplicationSettings.TryResolve<IPrefetch<ORMGOUserRole>>()?.Fetch(query, includes, parameters);

			// Do Paging (unless late-paging option is enabled)
			if (!ParameterKeys.IsOptionEnabled(parameters, ParameterKeys.DataProviderGetCollectionLatePaging))
			{
				if (pageNumber != 0 && pageSize > 0)
				{
					query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);
				}
			}
 
			var dataset = ApplicationSettings.Resolve<IObjectsDataSet>();
			var collection = query.Select(x => x.ToDataObject(dataset)).Cast<GOUserRoleDataObject>().ToList();
			return new DataObjectCollection<GOUserRoleDataObject>(collection);
        }

        protected override GOUserRoleDataObject DoSaveToDatabase(
			GOUserRoleDataObject entity, 
			List<string> includes, 
			IObjectsDataSet context,
			Parameters parameters)
        {
			return base.DoSaveToDatabase(entity, includes, context, parameters);
        }

		private IQueryable<ORMGOUserRole> Query(
			string dynamicFilterExpression,
			object[] dynamicFilterArguments,
			LambdaExpression compiledFilter)
		{
			return Query(null, dynamicFilterExpression, dynamicFilterArguments, compiledFilter);
		}

		private IQueryable<ORMGOUserRole> Query(
			Expression<Func<ORMGOUserRole, bool>> selectPredicate,
			string dynamicFilterExpression,
			object[] dynamicFilterArguments,
			LambdaExpression compiledFilter,
			bool throwIfAccessDenied = false)
		{
			var session = NHibernateSessionController.GetCurrentSession();

			IQueryable<ORMGOUserRole> query = null;

			if (!String.IsNullOrWhiteSpace(dynamicFilterExpression))
			{
				Expression<Func<ORMGOUserRole, bool>> dynamicPredicate = null;
 
				query = session.Query<ORMGOUserRole>();

				if (selectPredicate != null)
					query = query.Where(selectPredicate);

				dynamicPredicate = System.Linq.Dynamic.DynamicExpression.ParseLambda<ORMGOUserRole, bool>(dynamicFilterExpression, dynamicFilterArguments);

				if (dynamicPredicate != null)
					query = query.Where(dynamicPredicate);
			}
			else
			{
				query = session.Query<ORMGOUserRole>();

				if (selectPredicate != null)
					query = query.Where(selectPredicate);
			}

			return ApplyCompileTimeFilterExpression(query, compiledFilter, throwIfAccessDenied);
		}

		private IQueryable<ORMGOUserRole> ApplyCompileTimeFilterExpression(
			IQueryable<ORMGOUserRole> query, 
			LambdaExpression filterExpression, 
			bool throwIfAccessDenied)
		{
			// Apply filter, and if it's a security filter throw exception if no results after applying it
			var filter = filterExpression as Expression<Func<ORMGOUserRole, bool>>;

			if (filter != null)
			{
				if (query.Any())
				{
					var filtered = query.Where(filter);

					if (!filtered.Any())
					{
						if (throwIfAccessDenied)
						{
							var auth = ApplicationSettings.Container.Resolve<IAuthentication>();
							auth.ThrowAccessDenied(new GOServerException("accessDenied", auth.ExplainAccessDenied(EntityAccessEnum.READ, "GOUserRole")));
						}
					}

					query = filtered;
				}
			}

			return query;
		}
    }
}

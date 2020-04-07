﻿
////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Text;
using System.Threading.Tasks;
using Unity;
using Unity.Attributes;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.ExceptionHandling;
using GenerativeObjects.Practices.LayerSupportClasses;
using Solid.Data.DataObjects;
using Solid.Data.DataProviders.Database;

namespace Solid.Data.DataProviders.Dispatchers
{
    public class GOLoginHistoryDataProviderDispatcher : IDataProviderDispatcher<GOLoginHistoryDataObject>
    {

        public void DispatchForEntity(GOLoginHistoryDataObject entity, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters, bool skipSecurity = false)
        {
			// Remember includes we've already dispatched so as to avoid multiple data fetches
			var dispatched = new HashSet<string>();

			// get (custom) prefetch list so we can skip the dispatch for stuff we already fetched
			var prefetches = PrefetchAssociations.Get("GOLoginHistory", parameters);

            foreach (var include in includes)
            {
	
					string relation = include.Split('.').First().ToLower();
					var subincludes = DispatchPath.GetSubIncludes(relation, includes);

					if (relation.Contains(":"))
						relation = relation.Substring(relation.IndexOf(':') + 1);

					if (dispatched.Contains(relation))
						continue;

					dispatched.Add(relation);

					switch (relation)
					{
						default:
							throw new ApplicationException("GOLoginHistory Entity has no relation named " + relation);
					}
          }        
		}

        public void DispatchForEntityCollection(IEnumerable<GOLoginHistoryDataObject> entities, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters, bool skipSecurity = false)
        {
			// Remember includes we've already dispatched so as to avoid multiple data fetches
			var dispatched = new HashSet<string>();

			// get (custom) prefetch list so we can skip the dispatch for stuff we already fetched
			var prefetches = PrefetchAssociations.Get("GOLoginHistory", parameters);

            foreach (var include in includes)
            {
					string relation = include.Split('.').First().ToLower();
					var subincludes = DispatchPath.GetSubIncludes(relation, includes);

					if (relation.Contains(":"))
						relation = relation.Substring(relation.IndexOf(':') + 1);

					if (dispatched.Contains(relation))
						continue;

					dispatched.Add(relation);

					switch (relation)
					{
                  default:
                        throw new ApplicationException("GOLoginHistory Entity has no relation named " + relation);
					}
            }        
        }
	}
}
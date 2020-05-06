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
    public class LocationDataProviderDispatcher : IDataProviderDispatcher<LocationDataObject>
    {
		[Dependency]   
		public IDataProvider<PlaceToLocationDataObject> PlaceToLocationDataProvider { get; set; }        

        public void DispatchForEntity(LocationDataObject entity, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters, bool skipSecurity = false)
        {
			// Remember includes we've already dispatched so as to avoid multiple data fetches
			var dispatched = new HashSet<string>();

			// get (custom) prefetch list so we can skip the dispatch for stuff we already fetched
			var prefetches = PrefetchAssociations.Get("Location", parameters);

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
                  case "placetolocationitems":
							{
								// custom code can implement IPrefetch<ORMLocation> and add prefetch info through PrefetchAssociations helper => if set, we skip the dispatch-fetch
								if (prefetches.Contains("PlaceToLocationItems"))
									break;

								try
								{
									var objectToFetch = PlaceToLocationDataProvider.GetCollection(null, String.Format("LocationURI == \"{0}\"", entity.URI), null, null, 0, 0, subincludes, context, parameters, skipSecurity);
									if (objectToFetch != null) 
									{
										entity.ObjectsDataSet.Merge(objectToFetch.ObjectsDataSet);
									}
								}
								catch (GOServerException e)
								{
									if (e.Reason != "accessDenied")
										throw;
								}
								break;
							}
						default:
							throw new ApplicationException("Location Entity has no relation named " + relation);
					}
          }        
		}

        public void DispatchForEntityCollection(IEnumerable<LocationDataObject> entities, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters, bool skipSecurity = false)
        {
			// Remember includes we've already dispatched so as to avoid multiple data fetches
			var dispatched = new HashSet<string>();

			// get (custom) prefetch list so we can skip the dispatch for stuff we already fetched
			var prefetches = PrefetchAssociations.Get("Location", parameters);

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
						case "placetolocationitems":
                        {
							// custom code can implement IPrefetch<ORMLocation> and add prefetch info through PrefetchAssociations helper => if set, we skip the dispatch-fetch
							if (prefetches.Contains("PlaceToLocationItems"))
								break;

							var filterparameters = new object[] { entities.Select(e => e.URI).Distinct().ToArray() } ; 
							try
							{
								entities.First().ObjectsDataSet.Merge(PlaceToLocationDataProvider.GetCollection(null, "(@0.Contains(outerIt.LocationURI))", filterparameters, null, 0, 0, subincludes, context, parameters, skipSecurity).ObjectsDataSet);
							}
							catch (GOServerException e)
							{
								if (e.Reason != "accessDenied")
									throw;
							}
							break;
						}
                  default:
                        throw new ApplicationException("Location Entity has no relation named " + relation);
					}
            }        
        }
	}
}
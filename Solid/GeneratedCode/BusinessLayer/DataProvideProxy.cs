﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Solid.Data.DataObjects;
using Unity;
using GenerativeObjects.Practices.ORMSupportClasses;

namespace Solid.BusinessLayer.ORMSupportClasses
{
    public class DataProviderProxy : IDataProviderProxy
    {
		#region private fields
        // maps entity types to dataprovider types
        private Dictionary<Type, Type> _dataProviders = new Dictionary<Type, Type> 
        {
			{ typeof(CountryDataObject), typeof(IDataProvider<CountryDataObject>) },
			{ typeof(GOGroupDataObject), typeof(IDataProvider<GOGroupDataObject>) },
			{ typeof(GOGroupRoleDataObject), typeof(IDataProvider<GOGroupRoleDataObject>) },
			{ typeof(GOLoginHistoryDataObject), typeof(IDataProvider<GOLoginHistoryDataObject>) },
			{ typeof(GORoleDataObject), typeof(IDataProvider<GORoleDataObject>) },
			{ typeof(GOUserDataObject), typeof(IDataProvider<GOUserDataObject>) },
			{ typeof(GOUserGroupDataObject), typeof(IDataProvider<GOUserGroupDataObject>) },
			{ typeof(GOUserRoleDataObject), typeof(IDataProvider<GOUserRoleDataObject>) },
			{ typeof(LocationDataObject), typeof(IDataProvider<LocationDataObject>) },
			{ typeof(PlaceDataObject), typeof(IDataProvider<PlaceDataObject>) },
			{ typeof(PlaceToLocationDataObject), typeof(IDataProvider<PlaceToLocationDataObject>) },
			{ typeof(UserProfileDataObject), typeof(IDataProvider<UserProfileDataObject>) },
			{ typeof(VisitedPlaceDataObject), typeof(IDataProvider<VisitedPlaceDataObject>) },
		};
		#endregion

        public int Count(Type entityType, string filterPredicate, object[] filterArguments, GenerativeObjects.Practices.ORMSupportClasses.IObjectsDataSet context = null, Dictionary<string, object> parameters = null, bool skipSecurity = false)
        {
            var dataProvider = ApplicationSettings.Container.Resolve(_dataProviders[entityType]) as dynamic;
            return dataProvider.Count(filterPredicate, filterArguments, context, parameters, skipSecurity);
        }

        public void Delete(IDataObject entity, IObjectsDataSet context = null, Dictionary<string, object> parameters = null, bool skipSecurity = false)
        {
            var dataProvider = ApplicationSettings.Container.Resolve(_dataProviders[entity.GetType()]) as dynamic;
            dataProvider.Delete(entity, context, parameters, skipSecurity);
        }

        public IDataObject Get(IDataObject entity, List<string> includes = null, IObjectsDataSet context = null, Dictionary<string, object> parameters = null, bool skipSecurity = false)
        {
            var dataProvider = ApplicationSettings.Container.Resolve(_dataProviders[entity.GetType()]) as dynamic;
            return dataProvider.Get(entity, includes, context, parameters, skipSecurity);
        }

        public DataObjectCollection<IDataObject> GetCollection(Type entityType, string filterPredicate, object[] filterArguments = null, string orderByPredicate = null, int pageNumber = 0, int pageSize = 0, List<string> includes = null, IObjectsDataSet context = null, Dictionary<string, object> parameters = null, bool skipSecurity = false)
        {
            var dataProvider = ApplicationSettings.Container.Resolve(_dataProviders[entityType]) as dynamic;
            return dataProvider.GetCollection(filterPredicate, filterArguments, orderByPredicate, pageNumber, pageSize, includes, context, parameters, skipSecurity);
        }

        public IDataObject Save(IDataObject entity, List<string> includes = null, IObjectsDataSet context = null, Dictionary<string, object> parameters = null, bool skipSecurity = false)
        {
            var dataProvider = ApplicationSettings.Container.Resolve(_dataProviders[entity.GetType()]) as dynamic;
            return dataProvider.Save(entity, includes, context, parameters, skipSecurity);
        }
	}
}

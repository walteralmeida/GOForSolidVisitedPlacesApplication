﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.ORMSupportClasses;
using Solid.Data.DataObjects;
 

namespace Solid.Data.DataProviders.Custom
{
    public class UserProfileDataProvider : DataProvider<UserProfileDataObject>
    {
        protected override int DoCount(LambdaExpression securityFilterExpression, string filterPredicate, object[] filterArguments, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            throw new NotImplementedException();
        }

        protected override void DoDelete(UserProfileDataObject entity, LambdaExpression securityFilterExpression, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            throw new NotImplementedException();
        }

        protected override UserProfileDataObject DoGet(UserProfileDataObject entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            throw new NotImplementedException();
        }

        protected override DataObjectCollection<UserProfileDataObject> DoGetCollection(LambdaExpression securityFilterExpression, string filterPredicate, object[] filterArguments, string orderByPredicate, int pageNumber, int pageSize, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            throw new NotImplementedException();
        }

        protected override UserProfileDataObject DoSave(UserProfileDataObject entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            throw new NotImplementedException();
        }
    }
}

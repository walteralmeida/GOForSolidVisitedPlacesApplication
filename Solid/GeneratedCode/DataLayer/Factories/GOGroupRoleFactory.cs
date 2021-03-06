﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using GenerativeObjects.Practices.ORMSupportClasses;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Solid.Data.DataObjects;
using Solid.Data.DataObjects.Factories;
 

namespace Solid.Data.DataObjects.Factories
{
    public class GOGroupRoleFactory : IDataObjectFactory<GOGroupRoleDataObject> 
    {
        public object CreateDataSetContainer(GOGroupRoleDataObject entity)
        {
            return new GOGroupRoleContainer(entity);
        }

        public object CreateDataSetContainer(DataObjectCollection<GOGroupRoleDataObject> entityCollection)
        {
            return new GOGroupRoleCollectionContainer(entityCollection);
        }

        public GOGroupRoleDataObject CreateDataObject(IEnumerable<string> pks)
        {
            var pksAsArray = pks.ToArray();

            if (pksAsArray.Length != 2)
                throw new ApplicationException("CreateObject - GOGroupRole - Wrong number of PKs");

			System.String gogroupname;

			try 
			{
				gogroupname = pksAsArray[0];           
			}
			catch(Exception)
			{
                throw new ApplicationException("Wrong pk type for GOGroupRole.GOGroupName - should be System.String");
			}

			System.String gorolename;

			try 
			{
				gorolename = pksAsArray[1];           
			}
			catch(Exception)
			{
                throw new ApplicationException("Wrong pk type for GOGroupRole.GORoleName - should be System.String");
			}

                         
            var result = new GOGroupRoleDataObject(gogroupname, gorolename);
            return result;
        }

        public GOGroupRoleDataObject DeserializeFromContainer(string jsonstring, JsonSerializerSettings settings)
        {
            var container = JsonConvert.DeserializeObject<GOGroupRoleContainer>(jsonstring, settings);

			if(container == null)
			 return null;

			var result = container.ExtractGOGroupRole();

			// result can legitimately be null, because e.g. the dataset may contain an instance related to the main/primary entity, but not the main/primary entity itself
			// In this case we create an 'empty' instance of the main/primary entity and attach + reconstruct the dataset
            if (result == null)
            {
                result = new GOGroupRoleDataObject(container.PrimaryKey) { IsNew = false, IsDirty = false };
                result.ObjectsDataSet = container.ObjectsDataSet;

				// Sync the dataset 
				result.ObjectsDataSet.EnsureInitialized();
				result.ObjectsDataSet.ReconstructIndexes();
            }

			result.OnDeserialized();

			return result;
		}

		public GOGroupRoleDataObject DeserializeObject(string jsonstring, JsonSerializerSettings settings)
        {	
			var result = JsonConvert.DeserializeObject<GOGroupRoleDataObject>(jsonstring, settings);

			if(result == null)
			 return null;

			result.OnDeserialized();
			return result;
		}
	}
}
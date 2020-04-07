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
    public class GORoleFactory : IDataObjectFactory<GORoleDataObject> 
    {
        public object CreateDataSetContainer(GORoleDataObject entity)
        {
            return new GORoleContainer(entity);
        }

        public object CreateDataSetContainer(DataObjectCollection<GORoleDataObject> entityCollection)
        {
            return new GORoleCollectionContainer(entityCollection);
        }

        public GORoleDataObject CreateDataObject(IEnumerable<string> pks)
        {
            var pksAsArray = pks.ToArray();

            if (pksAsArray.Length != 1)
                throw new ApplicationException("CreateObject - GORole - Wrong number of PKs");

			System.String name;

			try 
			{
				name = pksAsArray[0];           
			}
			catch(Exception)
			{
                throw new ApplicationException("Wrong pk type for GORole.Name - should be System.String");
			}

                         
            var result = new GORoleDataObject(name);
            return result;
        }

        public GORoleDataObject DeserializeFromContainer(string jsonstring, JsonSerializerSettings settings)
        {
            var container = JsonConvert.DeserializeObject<GORoleContainer>(jsonstring, settings);

			if(container == null)
			 return null;

			var result = container.ExtractGORole();

			// result can legitimately be null, because e.g. the dataset may contain an instance related to the main/primary entity, but not the main/primary entity itself
			// In this case we create an 'empty' instance of the main/primary entity and attach + reconstruct the dataset
            if (result == null)
            {
                result = new GORoleDataObject(container.PrimaryKey) { IsNew = false, IsDirty = false };
                result.ObjectsDataSet = container.ObjectsDataSet;

				// Sync the dataset 
				result.ObjectsDataSet.EnsureInitialized();
				result.ObjectsDataSet.ReconstructIndexes();
            }

			result.OnDeserialized();

			return result;
		}

		public GORoleDataObject DeserializeObject(string jsonstring, JsonSerializerSettings settings)
        {	
			var result = JsonConvert.DeserializeObject<GORoleDataObject>(jsonstring, settings);

			if(result == null)
			 return null;

			result.OnDeserialized();
			return result;
		}
	}
}
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
    public class GOUserRoleFactory : IDataObjectFactory<GOUserRoleDataObject> 
    {
        public object CreateDataSetContainer(GOUserRoleDataObject entity)
        {
            return new GOUserRoleContainer(entity);
        }

        public object CreateDataSetContainer(DataObjectCollection<GOUserRoleDataObject> entityCollection)
        {
            return new GOUserRoleCollectionContainer(entityCollection);
        }

        public GOUserRoleDataObject CreateDataObject(IEnumerable<string> pks)
        {
            var pksAsArray = pks.ToArray();

            if (pksAsArray.Length != 2)
                throw new ApplicationException("CreateObject - GOUserRole - Wrong number of PKs");

			System.String gorolename;

			try 
			{
				gorolename = pksAsArray[0];           
			}
			catch(Exception)
			{
                throw new ApplicationException("Wrong pk type for GOUserRole.GORoleName - should be System.String");
			}

			System.Guid gouserid;

			try 
			{
				gouserid = Guid.Parse(pksAsArray[1]);           
			}
			catch(Exception)
			{
                throw new ApplicationException("Wrong pk type for GOUserRole.GOUserId - should be System.Guid");
			}

                         
            var result = new GOUserRoleDataObject(gorolename, gouserid);
            return result;
        }

        public GOUserRoleDataObject DeserializeFromContainer(string jsonstring, JsonSerializerSettings settings)
        {
            var container = JsonConvert.DeserializeObject<GOUserRoleContainer>(jsonstring, settings);

			if(container == null)
			 return null;

			var result = container.ExtractGOUserRole();

			// result can legitimately be null, because e.g. the dataset may contain an instance related to the main/primary entity, but not the main/primary entity itself
			// In this case we create an 'empty' instance of the main/primary entity and attach + reconstruct the dataset
            if (result == null)
            {
                result = new GOUserRoleDataObject(container.PrimaryKey) { IsNew = false, IsDirty = false };
                result.ObjectsDataSet = container.ObjectsDataSet;

				// Sync the dataset 
				result.ObjectsDataSet.EnsureInitialized();
				result.ObjectsDataSet.ReconstructIndexes();
            }

			result.OnDeserialized();

			return result;
		}

		public GOUserRoleDataObject DeserializeObject(string jsonstring, JsonSerializerSettings settings)
        {	
			var result = JsonConvert.DeserializeObject<GOUserRoleDataObject>(jsonstring, settings);

			if(result == null)
			 return null;

			result.OnDeserialized();
			return result;
		}
	}
}
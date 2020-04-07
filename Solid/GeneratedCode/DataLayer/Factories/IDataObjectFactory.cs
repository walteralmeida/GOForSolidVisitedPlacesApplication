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

namespace Solid.Data.DataObjects.Factories
{
    public interface IDataObjectFactory<TENTITY> where TENTITY : IDataObject
    {
        object CreateDataSetContainer(TENTITY entity);
        object CreateDataSetContainer(DataObjectCollection<TENTITY> entityCollection);
        TENTITY CreateDataObject(IEnumerable<string> pks);

        TENTITY DeserializeFromContainer(string jsonstring, JsonSerializerSettings settings);
		TENTITY DeserializeObject(string jsonstring, JsonSerializerSettings settings);
    }
}


﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using GenerativeObjects.Practices.MVPVM;
using GenerativeObjects.Practices.ORMSupportClasses;
using Unity;

namespace Solid.BusinessLayer.ORMSupportClasses
{
	
	public abstract class DataObjectService<TDataObject>
        where TDataObject : IDataObject, new()
    {		

        public virtual TDataObject CreateNewInstance()
        {
            return new TDataObject();
        }

        public virtual TDataObject CreateNewInstance(TDataObject templateEntity)
        {
            return (TDataObject) templateEntity.Clone(false);
        }

		public void Dispose()
        {
        }
	}	
}
  
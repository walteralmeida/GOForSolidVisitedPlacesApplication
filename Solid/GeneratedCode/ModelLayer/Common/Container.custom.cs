﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using Unity;
using GenerativeObjects.Practices;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.LayerSupportClasses.ServiceLayer.Extensions;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer.Extensions;
using Solid.Data.DataObjects;

namespace Solid.Client.Model
{
    public static class CustomContainer
    {
        public static void RegisterCustomTypes(IUnityContainer container)
        {
			//TODO : register here your custom types
			// example:
            // container.RegisterType<IDataProviderExtension<MyDataObject>, MyDataProviderExtension>("MyDataProviderExtension", new ContainerControlledLifetimeManager());
			// other example: (no singleton here to avoid collisions)
            //container.RegisterType<IImportExportComponentExtension<MyImportComponent, MyDataObject>, MyImportExtension>("MyImportExtension");



        }
    }
}

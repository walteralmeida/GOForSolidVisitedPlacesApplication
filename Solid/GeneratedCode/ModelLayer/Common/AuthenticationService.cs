﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Security.Common;
using Unity;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Net;
using GenerativeObjects.Practices;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Threading;
using GenerativeObjects.Practices.LayerSupportClasses.ServiceLayer.Http;

namespace Solid.Client.Model
{
    public partial class AuthenticationService
    {
        static readonly string BaseUrl = ConfigurationManager.AppSettings["baseURL"];
        static readonly string UserName = ConfigurationManager.AppSettings["UserName"];
        static readonly string Password = ConfigurationManager.AppSettings["Password"];
        static string _serviceUrl = String.Format("{0}/dataset/api/gosecurityprovider/authenticate?username={1}&password={2}", 
            BaseUrl.TrimEnd('/'), 
            UserName, 
            Password);

		//[Dependency]  //impossible to use Auto-injection because this class is used in a Task created by LLBLGen and then outside IOC container
		// Needs to be PerThread anyway, so we want to find the instance for current thread  for each thread access
		public IThreadContext ClientContext => ApplicationSettings.Container.Resolve<IThreadContext>();

        /// <summary>
        /// This method will try to Authenticate using the configuration manager.
        /// The following keys need to be set: baseURL, UserName, Password
        /// If authentication succeeds, the userToken will be automatically set
        /// </summary>
        public void Authenticate()
        {
            Authenticate(_serviceUrl);
        }

		/// <summary>
        /// This method will try to Authenticate using the provided username and password.
        /// <para>The baseURL key needs to be set in the Configuration.</para>
        /// </summary>
        /// <param name="username">The username to use for login</param>
        /// <param name="password">The login to use for login</param>
        public void Authenticate(string username, string password)
        {
            var url = String.Format("{0}/dataset/api/gosecurityprovider/authenticate?username={1}&password={2}",
                        BaseUrl.TrimEnd('/'), // 0
                        username, // 1
                        password); // 2

            Authenticate(url);
        }

        private void Authenticate(string url)
        {
		    var uri = HttpUtilities.AddQueryParam(url, ApiRequest.RequestParameter.DB_KEY, ClientContext.DbKey);
            WebRequest httpLoginWebRequest = WebRequest.Create(uri);
            httpLoginWebRequest.ContentType = "application/json";
            httpLoginWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpLoginWebRequest.GetRequestStream()))
            {
                streamWriter.Flush();
                streamWriter.Close();
            }

            WebResponse httpLoginWebResponse = (HttpWebResponse)httpLoginWebRequest.GetResponse();

            using (var streamReader = new StreamReader(httpLoginWebResponse.GetResponseStream()))
            {
                var jsonTextReader = new JsonTextReader(streamReader);
                ClientContext.UserToken = jsonTextReader.ReadAsString(); 
            }
        }
    }
}

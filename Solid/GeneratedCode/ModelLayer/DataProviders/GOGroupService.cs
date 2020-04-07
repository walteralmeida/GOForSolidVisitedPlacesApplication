﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Text;
using GenerativeObjects.Practices.ORMSupportClasses;
using GenerativeObjects.Practices.ExceptionHandling;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;	
using GenerativeObjects.Practices.LayerSupportClasses.Features.Security.Common;
using GenerativeObjects.Practices.LayerSupportClasses.ServiceLayer.Http;
using GenerativeObjects.Practices.LayerSupportClasses.ClientLayer;
using GenerativeObjects.Practices.Settings;
using Solid.Data.DataObjects;
using Solid.Data.DeleteHandlers;
using Unity;
using Newtonsoft.Json;
using System.Web;
using System.IO;
using System.Collections.Generic;
using System.Net;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using Parameters = System.Collections.Generic.Dictionary<string, object>;


namespace Solid.Client.Model
{
	public partial class GOGroupService : QueryParamCollection, IDataProvider<GOGroupDataObject>
    {	
		static readonly string BaseUrl = String.Format("{0}{1}/", ConfigurationManager.AppSettings["BaseURL"], ConfigurationManager.AppSettings["ProjectName"]);
		static string _serviceUrl = String.Format("{0}/dataset/api/{1}/", BaseUrl.TrimEnd('/'), "gogroup");		

		private JsonSerializerSettings _jsonSerializerSettings;
		
        //[Dependency]  //impossible to use Auto-injection because some Services are sometimes creating directly class in templates (then without using IOC container)
        public IUserIdentity UserIdentity => ApplicationSettings.Container.Resolve<IUserIdentity>();

		public const string WebRequestTimeout = "WebRequestTimeout";

		public JsonSerializerSettings JsonSerializerSettings
		{
			get
			{
				if (_jsonSerializerSettings == null) 
				{
					_jsonSerializerSettings = new JsonSerializerSettings() { TypeNameHandling = TypeNameHandling.Auto, Binder = new TypeNameSerializationBinder("Solid.Data.DataObjects.{0}, Solid.Data.DataObjects") };
				}

				return _jsonSerializerSettings;
			}
		}      

		public virtual GOGroupDataObject Save(
			GOGroupDataObject theDataObjectToSave, 
			bool includeDirtyObjectsOnly,
			LambdaExpression securityFilterExpression = null, 
			List<string> includes = null, 
			IObjectsDataSet context = null, 
			Parameters parameters = null, 
			bool skipSecurity = false /* skipSecurity has no effect here */)
		{
			return Save(new GOGroupContainer(theDataObjectToSave, includeDirtyObjectsOnly), securityFilterExpression, includes, parameters: parameters);
		}

		public virtual GOGroupDataObject Save(
			GOGroupDataObject theDataObjectToSave, 
			LambdaExpression securityFilterExpression = null, 
			List<string> includes = null, 
			IObjectsDataSet context = null, 
			Parameters parameters = null, 
			bool skipSecurity = false /* skipSecurity has no effect here */)
		{
			bool includeDirtyObjectsOnly = GetIncludeDirtyObjectsOnlyOption(parameters);
			return Save(new GOGroupContainer(theDataObjectToSave, includeDirtyObjectsOnly), securityFilterExpression, includes, parameters: parameters);
		}

		public virtual GOGroupDataObject Save(
			GOGroupContainer theDataObjectToSave,
			LambdaExpression securityFilterExpression = null, 
			List<string> includes = null,
			bool skipSecurity = false, 
			Parameters parameters = null) 
		{
            var uri = new Uri(_serviceUrl);
			var request = WebRequest.Create(uri);
            request.ContentType = "application/x-www-form-urlencoded";
            request.Method = "POST";
			request.Timeout = GetRequestTimeout(parameters);

			using (var stream = request.GetRequestStream())
			{
				string objectToSaveAsString = JsonConvert.SerializeObject(theDataObjectToSave, JsonSerializerSettings);

				var byteArray = Encoding.UTF8.GetBytes("entity=" + HttpUtility.UrlEncode(objectToSaveAsString));
				stream.Write(byteArray, 0, byteArray.Length);

				if (includes != null && includes.Any())
				{
					byteArray = Encoding.UTF8.GetBytes("&include=" + HttpUtility.UrlEncode(String.Join(",", includes)));
					stream.Write(byteArray, 0, byteArray.Length);
				}

				// get user token for currently authenticated user if any    
				var userToken = UserIdentity.UserToken;

				if (!String.IsNullOrEmpty(userToken))
				{
					byteArray = Encoding.UTF8.GetBytes("&_user_token=" + userToken);
					stream.Write(byteArray, 0, byteArray.Length);
				}

				// Add custom query params
				WriteQueryParams(stream);

				try
				{
					using (var response = request.GetResponse())
					{
						if (response == null)
							throw new PulpException("Unable to get the response from " + uri.ToString());
					
						using (var responseStream = response.GetResponseStream())
						{
							if (responseStream == null)
								throw new PulpException("Unable to get the response stream from " + uri.ToString());
	 
							var sr = new StreamReader(responseStream);
							var container = JsonConvert.DeserializeObject<GOGroupContainer>(sr.ReadToEnd(), JsonSerializerSettings);

							if (container == null)
							{
								if (theDataObjectToSave.ExtractGOGroup().IsMarkedForDeletion)
									return null;
								else
									throw new GOServerException("No GOGroup in the response to SDK DataProvider Save(). Not expecting a null response here!");
							}
							else
							{
								container.ObjectsDataSet.EnsureInitialized();
								container.ObjectsDataSet.ReconstructIndexes();

								response.Close();
								return container.ExtractGOGroup();
							}
						}
					}
				}
				catch (WebException we)
				{
					// See if we can decode GOServerException
					var error = GOServerException.FromWebResponse(we);

					if (error != null)
						throw error;

					throw;
				}
			}
		}

		public virtual GOGroupDataObject Get(
			GOGroupDataObject theDataObjectToGet,
			LambdaExpression securityFilterExpression = null, 
			List<string> includes = null, 
			IObjectsDataSet context = null, 
			Parameters parameters = null, 
			bool skipSecurity = false /* skipSecurity has no effect here */) 
		{
			var pPath = (includes != null && includes .Any()) ? "?include=" + HttpUtility.UrlEncode(String.Join(",", includes)) : "";
			var pksUrl = "";
			pksUrl += Uri.EscapeDataString(theDataObjectToGet.Name.ToString()) + "/";
			pksUrl.TrimEnd('/');

	        // get user token for currently authenticated user if any    
			var userToken = UserIdentity.UserToken;

            if (!String.IsNullOrEmpty(userToken))
            {
                pPath = !String.IsNullOrEmpty(pPath) ? pPath + "&_user_token=" : "?_user_token=";
                pPath += userToken;
            }

			var uri = new Uri(String.Concat(_serviceUrl, "byid/", pksUrl, pPath));

			// custom query params
			uri = AppendQueryParams(uri);

            var request = WebRequest.Create(uri);
            request.ContentType = "application/x-www-form-urlencoded";
			request.Timeout = GetRequestTimeout(parameters);

			try
			{
				using (var response = request.GetResponse())
				{
					if (response == null)
						throw new PulpException("Unable to get the response from " + uri.ToString());

					using (var responseStream = response.GetResponseStream())
					{
						if (responseStream == null)
							throw new PulpException("Unable to get the response stream from " + uri.ToString());

						using (var sr = new StreamReader(responseStream))
						{
							var container = JsonConvert.DeserializeObject<GOGroupContainer>(sr.ReadToEnd(), JsonSerializerSettings);

							container.ObjectsDataSet.EnsureInitialized();
							container.ObjectsDataSet.ReconstructIndexes();

							response.Close();
							return container.ExtractGOGroup();
						}
					}
				}
			}
			catch (WebException we)
			{
				// See if we can decode GOServerException
				var error = GOServerException.FromWebResponse(we);

				if (error != null)
					throw error;

				throw;
			}
		}

		public virtual DataObjectCollection<GOGroupDataObject> GetCollection(
			LambdaExpression securityFilterExpression = null, 
			string filterPredicate = null, 
			object[] filterArguments = null, 
			string orderByPredicate = null, 
			int pageNumber = 0, 
			int pageSize = 0, 
			List<string> includes = null, 
			IObjectsDataSet context = null, 
			Parameters parameters = null, 
			bool skipSecurity = false /* skipSecurity has no effect here */)
	    {
			var pFilter = filterPredicate;
			if(filterArguments != null)
			{		
				for(var i = 0; i < filterArguments.Length; i++)
				{
					var toReplace = (filterArguments[i] is string || filterArguments[i] is Guid) ? "\"" + filterArguments[i].ToString() + "\"" : filterArguments[i].ToString();
					pFilter = pFilter.Replace("@"+i, toReplace );
				}
			}
			pFilter = !String.IsNullOrEmpty(filterPredicate) ? "&filter=" + HttpUtility.UrlEncode(pFilter) : "";

			var pPath = (includes != null && includes.Any()) ? "&include=" + HttpUtility.UrlEncode(String.Join(",",includes)) : "";
			
			string orderBy = null;
			if (!String.IsNullOrEmpty(orderByPredicate))
			{
				string[] toks = orderByPredicate.Split(new char[] { ' ' });

				if (toks.Length > 2)
					throw new GOServerException("OrderBy predicate, expected format is '{sortColumnName} {sortOrder}'");

				orderBy = $"&sortColumn={toks[0]}{(toks.Length > 1 ? ($"&sortOrder={toks[1]}") : "")}";
			}

			var pPageNumber = "?pageNumber=" + pageNumber;
			var pPageSize = pageSize>0 ? "&pageSize=" + pageSize : "";

	        // get user token for currently authenticated user if any    
			var userToken = UserIdentity.UserToken;
			string pUserToken = null;
 
            if (!String.IsNullOrEmpty(userToken))
            {
				pUserToken = "&_user_token=" + userToken;
            }

			var uriparameters = $"{pPageNumber}{pPageSize}{orderBy}{pFilter}{pPath}{pUserToken}";

			var uri = new Uri(String.Concat(_serviceUrl, "list", uriparameters));
			
			// custom query params
			uri = AppendQueryParams(uri);
			
            var request = WebRequest.Create(uri);
            request.ContentType = "application/x-www-form-urlencoded";
			request.Timeout = GetRequestTimeout(parameters);

			try
			{
				using (var response = request.GetResponse())
				{
					if (response == null)
						throw new PulpException("Unable to get the response from " + uri.ToString());

					using (var responseStream = response.GetResponseStream())
					{
						if (responseStream == null)
							throw new PulpException("Unable to get the response stream from " + uri.ToString());
	
 
						using (var sr = new StreamReader(responseStream))
						{
							var container = JsonConvert.DeserializeObject<GOGroupCollectionContainer>(sr.ReadToEnd(), JsonSerializerSettings);
							container.ObjectsDataSet.EnsureInitialized();
							container.ObjectsDataSet.ReconstructIndexes();

							response.Close();
							return container.ExtractGOGroupItems();
						}
					}
				}
			}
			catch (WebException we)
			{
				// See if we can decode GOServerException
				var error = GOServerException.FromWebResponse(we);

				if (error != null)
					throw error;

				throw;
			}
	    }

		public virtual void Delete(
			GOGroupDataObject theDataObjectToDelete, 
			LambdaExpression securityFilterExpression = null, 
			IObjectsDataSet context = null, 
			Parameters parameters = null, 
			bool skipSecurity = false /* skipSecurity has no effect here */)
		{
			// FC Anyone know why the append .json string? Seems incompatible with EntityApiHandler.ProceeDelete (so I'm removing it)
            // var uri = new Uri(_serviceUrl + "DeleteGOGroup.json");
			var uri = new Uri(_serviceUrl);

			// Honour dry-run 
			bool isDryRun = parameters != null && parameters.ContainsKey(ParameterKeys.DryDelete) && (bool)parameters[ParameterKeys.DryDelete] == true;
			if (isDryRun)
				uri = new Uri(_serviceUrl + "?" + ApiRequest.RequestParameter.DryDelete + "=true");

			// custom query params
			uri = AppendQueryParams(uri);

			var request = WebRequest.Create(uri);
            request.ContentType = "application/x-www-form-urlencoded";
            request.Method = "DELETE";
			request.Timeout = GetRequestTimeout(parameters);


			using (var stream = request.GetRequestStream())
			{
				string objectToDeleteAsString = JsonConvert.SerializeObject(new GOGroupContainer(theDataObjectToDelete), JsonSerializerSettings);

				var byteArray = Encoding.UTF8.GetBytes("entity=" + HttpUtility.UrlEncode(objectToDeleteAsString));
				stream.Write(byteArray, 0, byteArray.Length);

				// get user token for currently authenticated user if any    
				var userToken = UserIdentity.UserToken;

				if (!String.IsNullOrEmpty(userToken))
				{
					byteArray = Encoding.UTF8.GetBytes("&_user_token=" + userToken);
					stream.Write(byteArray, 0, byteArray.Length);
				}

				try
				{
					using (var response = request.GetResponse())
					{
						if (response == null)
							throw new PulpException("Unable to get the response from " + uri.ToString());

						using (var responseStream = response.GetResponseStream())
						{
							if (responseStream == null)
								throw new PulpException("Unable to get the response stream from " + uri.ToString());

							// if this is a dry-run request, read the response and return to caller via the parameters
							if (isDryRun)
							{
								var encoding = Encoding.UTF8;
								using (var reader = new StreamReader(responseStream, encoding))
								{
									parameters[ParameterKeys.DeleteStackJsonEncoded] = reader.ReadToEnd();
								}
							}
						}

						response.Close();
					}
				}
				catch (WebException we)
				{
					// See if we can decode GOServerException
					var error = GOServerException.FromWebResponse(we);

					if (error != null)
						throw error;

					throw;
				}
			}
		}

        public virtual int Count(
			LambdaExpression securityFilterExpression = null, 
			string filterPredicate = null, 
			object[] filterArguments = null, 
			IObjectsDataSet context = null, 
			Parameters parameters = null, 
			bool skipSecurity = false /* skipSecurity has no effect here */)
        {
            throw new NotImplementedException();
        }

		private int GetRequestTimeout(Parameters parameters)
		{
			// Parameters take precedence
			if (parameters != null && parameters.ContainsKey(ParameterKeys.WebRequestTimeout))
				return (int)parameters[ParameterKeys.WebRequestTimeout];
			
			// Else try from config
			else if (AppSettings.Get(WebRequestTimeout) != null)
				return Convert.ToInt32(AppSettings.Get(WebRequestTimeout));

			return 60 * 1000;		// Webrequest default is 100 seconds, which seems nuts. let's set this number of seconds as the GO SDK default
		}

		private bool GetIncludeDirtyObjectsOnlyOption(Parameters parameters)
		{
			// Parameters take precedence
			if (parameters != null && parameters.ContainsKey(ParameterKeys.SDKSaveIncludeDirtyObjectsOnly))
				return (bool)parameters[ParameterKeys.SDKSaveIncludeDirtyObjectsOnly];

			return true;
		}
    }
}

﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Data;
using System.Collections;
using System.Linq;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.Test.Api;
using Unity;
using NUnit.Framework;
using Newtonsoft.Json;
using FluentAssertions;
using Solid.Data.DataObjects;
using GenerativeObjects.Practices.Test.TestCase;
using static GenerativeObjects.Practices.Test.TestCase.TestCaseSourceManager;
using GenerativeObjects.Practices.Web.Remote;
using System.Net;

namespace Solid.Tests.Api.Tests
{	
	/// <summary>
	/// ApiTests class for the entity 'GOUser'.
	/// </summary>
	[TestFixture]
	[Category("Generated_ApiTests")]
	public class GOUserTestsApi
	{
		static readonly string appUrl = APITestManager.getApiUrl() + "gouser/";

	    [OneTimeSetUp]
        public void TestFixtureInit()
        {
			ApplicationSettings.InitializeContainer(Solid.ServiceLayer.Container.Initialize());
			//APITestManager.executeSQLFile("GOUser");
        }

        [SetUp]
        public void TestInit()
        {
        }

        [TearDown]
        public void TestDispose()
        {
        }

        [OneTimeTearDown]
        public void TestFixtureDispose()
        {
        }

        [Test, TestCaseSource("GOUserPostData")]
        public void GOUserPostTest(IDictionary testData)
        {
			#region Arrange

			var currentEntity = new GOUserDataObject();
			var include = "";
			var token = "";

			currentEntity.IsNew = Convert.ToBoolean(testData["IsNew"].ToString()); 

			if (!currentEntity.IsNew)
			{
				currentEntity.Id = System.Guid.Parse(testData["Id"].ToString().Trim());
				include = testData["Include"].ToString().Trim();
			}
			currentEntity.Blocked = Convert.ToBoolean(testData["Blocked"]?.ToString().Trim());
			currentEntity.EmailAddress = testData["Email"]?.ToString().Trim() != null ? testData["Email"]?.ToString().Trim().ToString() : null;
			currentEntity.EmailValidated = Convert.ToBoolean(testData["Email Verified?"]?.ToString().Trim());
			currentEntity.FirstName = testData["First Name"]?.ToString().Trim() != null ? testData["First Name"]?.ToString().Trim().ToString() : null;
			currentEntity.FullName = testData["Full Name"]?.ToString().Trim() != null ? testData["Full Name"]?.ToString().Trim().ToString() : null;
			currentEntity.LastName = testData["Surname"]?.ToString().Trim() != null ? testData["Surname"]?.ToString().Trim().ToString() : null;
			currentEntity.Password = testData["Password"]?.ToString().Trim() != null ? testData["Password"]?.ToString().Trim().ToString() : null;
			currentEntity.PasswordExpiry = Convert.ToDateTime(testData["Password Expiry"]?.ToString().Trim());
			currentEntity.Unregistered = Convert.ToBoolean(testData["Unregistered"]?.ToString().Trim());
			currentEntity.UserName = testData["User Name"]?.ToString().Trim() != null ? testData["User Name"]?.ToString().Trim().ToString() : null;
			currentEntity.UserValidated = Convert.ToBoolean(testData["Admin Approved?"]?.ToString().Trim());
			var expected_result = ConvertToStatusCode(testData["Result"]);
			
			#endregion

			#region Act

			var json = JsonConvert.SerializeObject(currentEntity);
            var postUrl = APITestManager.doPostRequestBody(json, include);
			
			APIWebRequest request = new APIWebRequest();
			var username = testData["Username"].ToString().Trim();
			var password = testData["Password"].ToString().Trim();
			token = request.getToken(APITestManager.getAuthenticateUrl(), username, password);
			using (var testResponse = request.ProcessAPIWebRequest(appUrl, APIWebRequest.TypeCall.Save, postUrl, token))
			{
				var status_code = testResponse.StatusCode;
				var status_description =  testResponse.Status;
				var response_body = testResponse.Body;

			#endregion

			#region Assert

				APITestManager.displayResponse(testResponse);
				Assert.AreEqual(expected_result, status_code);

				if (status_code == HttpStatusCode.OK)
				{
					// to be implemented
				}
			
			#endregion
			}
        }

        [Test, TestCaseSource("GOUserGetData")]
        public void GOUserGetTest(IDictionary testData)
        {
			#region Arrange

			var list = new List<string>();
			string pkId = testData["Id"].ToString().Trim();
			list.Add(pkId);
	   		string pkString = string.Join("/", list.ToArray());
			string token = "";
			
			#endregion

			#region Act

			var request = new APIWebRequest();
            
			var username = testData["Username"].ToString().Trim();
			var password = testData["Password"].ToString().Trim();
			token = request.getToken(APITestManager.getAuthenticateUrl(), username, password);
			using (var testResponse = request.ProcessAPIWebRequest(appUrl, APIWebRequest.TypeCall.Get, pkString, token))
			{
				var status_code = testResponse.StatusCode;
				var response_body = testResponse.Body;
				var expected_result = ConvertToStatusCode(testData["Result"]);
			
			#endregion

			#region Assert

				Assert.AreEqual(expected_result, status_code);
				APITestManager.displayResponse(testResponse);

				if (status_code == HttpStatusCode.OK)
				{
				// to be implemented
				}
			
			#endregion
			}
        }


        [Test, TestCaseSource("GOUserDeleteData")]
        public void GOUserDeleteTest(IDictionary testData)
        {
			#region Arrange

			var list = new List<string>();
			string pkId = testData["Id"].ToString().Trim();
			list.Add(pkId);
	   		string pkString = string.Join("/", list.ToArray());
			string token = "";

			#endregion

			#region Act

			var request = new APIWebRequest();
            
			var username = testData["Username"].ToString().Trim();
			var password = testData["Password"].ToString().Trim();
			token = request.getToken(APITestManager.getAuthenticateUrl(), username, password);
			using (var testResponse = request.ProcessAPIWebRequest(appUrl, APIWebRequest.TypeCall.Delete, pkString, token))
			{
				var status_code = testResponse.StatusCode;
	            var response_body = testResponse.Body;
		        var expected_result = ConvertToStatusCode(testData["Result"]);
	
			#endregion

			#region Assert

				Assert.AreEqual(expected_result, status_code);
				APITestManager.displayResponse(testResponse);

				if (status_code == HttpStatusCode.NoContent)
				{
				// to be implemented
				// add validation that entity was removed from DB, something like:
				//CustomerDAO customerDAO = CustomerDAOFactory.getInstance();
				//Customer customerDB = customerDAO.getCustomerByID(customer.id);
				//Assert.IsNull(customerDB);
				}

			#endregion
			}
        }

        [Test, TestCaseSource("GOUserGetCollectionData")]
        public void GOUserGetCollectionTest(IDictionary testData)
        {
			#region Arrange

			var _testData = APITestManager.CreateUrlDataParametersDictionary(testData);

            var filter = _testData["filter"].ToString();
            var sortColumn = _testData["sortColumn"].ToString();
            var sortOrder = _testData["sortOrder"].ToString();
            var include = _testData["Include"].ToString();
            var pageNumber = Convert.ToInt32(_testData["PageNumber"]);
            var pageSize = Convert.ToInt32(_testData["PageSize"]);
			var token = "";

			#endregion

			#region Act

			var queryString = APITestManager.doURLQueryString(_testData);
			var request = new APIWebRequest();
            
			var username = testData["Username"].ToString().Trim();
			var password = testData["Password"].ToString().Trim();
			token = request.getToken(APITestManager.getAuthenticateUrl(), username, password);
			using (var testResponse = request.ProcessAPIWebRequest(appUrl, APIWebRequest.TypeCall.GetCollection, queryString, token))
			{
				var status_code = testResponse.StatusCode;
				var response_body = testResponse.Body;
				var expected_result = ConvertToStatusCode(testData["Result"]);

			#endregion

			#region Assert

				Assert.AreEqual(expected_result, status_code);
				APITestManager.displayResponse(testResponse);

				if (status_code == HttpStatusCode.OK)
				{
				// to be implemented
				// we have to compare collections from database and returned from API response
				}

			#endregion
			}
        }

        [Test, TestCaseSource("GOUserCountData")]
        public void GOUserCountTest(IDictionary testData)
        {
			#region Arrange

			Dictionary<string, string> _testData = APITestManager.CreateUrlDataParametersDictionary(testData);
            var filter = _testData["filter"].ToString();
			var token = "";
			
			#endregion

			#region Act

			var queryString = APITestManager.doURLQueryString(_testData);
			var request = new APIWebRequest();
            
			var username = testData["Username"].ToString().Trim();
			var password = testData["Password"].ToString().Trim();
			token = request.getToken(APITestManager.getAuthenticateUrl(), username, password);
			using (var testResponse = request.ProcessAPIWebRequest(appUrl, APIWebRequest.TypeCall.Count, queryString, token))
			{
				var status_code = testResponse.StatusCode;
				var response_body = testResponse.Body;
				var expected_result = ConvertToStatusCode(testData["Result"]);

			#endregion

			#region Assert

				Assert.AreEqual(expected_result, status_code);
				APITestManager.displayResponse(testResponse);

				if (status_code == HttpStatusCode.OK)
				{
				// to be implemented, we have to compare count returned from DB and count returned with the API response. Should be something like: 
				// CustomerDAO customerDAO = CustomerDAOFactory.getInstance();
				// int expected_count = customerDAO.getCountWithFilter(filter);
				// Assert.AreEqual(expected_count, Convert.ToInt32(response_body));
				}

			#endregion
			}
        }

		public static IEnumerable<TestCaseData> GOUserPostData
        {
			get{ return TestCaseSourceManager.PrepareTestCaseData("GOUser", "Post"); }
        }

		public static IEnumerable<TestCaseData> GOUserGetData
        {
			get{ return TestCaseSourceManager.PrepareTestCaseData("GOUser", "Get"); }
        }

		public static IEnumerable<TestCaseData> GOUserDeleteData
		{
			get{ return TestCaseSourceManager.PrepareTestCaseData("GOUser", "Delete"); }
        }

		public static IEnumerable<TestCaseData> GOUserGetCollectionData
		{
			get{ return TestCaseSourceManager.PrepareTestCaseData("GOUser", "GetCollection"); }
        }

		public static IEnumerable<TestCaseData> GOUserCountData
		{
			get{ return TestCaseSourceManager.PrepareTestCaseData("GOUser", "Count"); }
		}
	}
}
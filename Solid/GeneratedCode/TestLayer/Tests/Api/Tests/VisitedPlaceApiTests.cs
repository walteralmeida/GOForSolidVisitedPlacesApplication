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
	/// ApiTests class for the entity 'VisitedPlace'.
	/// </summary>
	[TestFixture]
	[Category("Generated_ApiTests")]
	public class VisitedPlaceTestsApi
	{
		static readonly string appUrl = APITestManager.getApiUrl() + "visitedplace/";

	    [OneTimeSetUp]
        public void TestFixtureInit()
        {
			ApplicationSettings.InitializeContainer(Solid.ServiceLayer.Container.Initialize());
			//APITestManager.executeSQLFile("VisitedPlace");
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

        [Test, TestCaseSource("VisitedPlacePostData")]
        public void VisitedPlacePostTest(IDictionary testData)
        {
			#region Arrange

			var currentEntity = new VisitedPlaceDataObject();
			var include = "";
			var token = "";

			currentEntity.IsNew = Convert.ToBoolean(testData["IsNew"].ToString()); 

			if (!currentEntity.IsNew)
			{
				currentEntity.Id = System.Guid.Parse(testData["Id"].ToString().Trim());
				include = testData["Include"].ToString().Trim();
			}
			currentEntity.CountryURI = testData["CountryURI"]?.ToString().Trim() != null ? testData["CountryURI"]?.ToString().Trim().ToString() : null;
			currentEntity.Date = Convert.ToDateTime(testData["Date"]?.ToString().Trim());
			currentEntity.Description = testData["Description"]?.ToString().Trim() != null ? testData["Description"]?.ToString().Trim().ToString() : null;
			currentEntity.PlaceURI = testData["PlaceURI"]?.ToString().Trim() != null ? testData["PlaceURI"]?.ToString().Trim().ToString() : null;
			currentEntity.Typeofplace = (PlaceTypesEnum) Convert.ToInt32(testData["Type of place"]?.ToString().Trim());
			currentEntity.UserProfileUri = testData["UserProfileUri"]?.ToString().Trim() != null ? testData["UserProfileUri"]?.ToString().Trim().ToString() : null;
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

        [Test, TestCaseSource("VisitedPlaceGetData")]
        public void VisitedPlaceGetTest(IDictionary testData)
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


        [Test, TestCaseSource("VisitedPlaceDeleteData")]
        public void VisitedPlaceDeleteTest(IDictionary testData)
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

        [Test, TestCaseSource("VisitedPlaceGetCollectionData")]
        public void VisitedPlaceGetCollectionTest(IDictionary testData)
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

        [Test, TestCaseSource("VisitedPlaceCountData")]
        public void VisitedPlaceCountTest(IDictionary testData)
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

		public static IEnumerable<TestCaseData> VisitedPlacePostData
        {
			get{ return TestCaseSourceManager.PrepareTestCaseData("VisitedPlace", "Post"); }
        }

		public static IEnumerable<TestCaseData> VisitedPlaceGetData
        {
			get{ return TestCaseSourceManager.PrepareTestCaseData("VisitedPlace", "Get"); }
        }

		public static IEnumerable<TestCaseData> VisitedPlaceDeleteData
		{
			get{ return TestCaseSourceManager.PrepareTestCaseData("VisitedPlace", "Delete"); }
        }

		public static IEnumerable<TestCaseData> VisitedPlaceGetCollectionData
		{
			get{ return TestCaseSourceManager.PrepareTestCaseData("VisitedPlace", "GetCollection"); }
        }

		public static IEnumerable<TestCaseData> VisitedPlaceCountData
		{
			get{ return TestCaseSourceManager.PrepareTestCaseData("VisitedPlace", "Count"); }
		}
	}
}
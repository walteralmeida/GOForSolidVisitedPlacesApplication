﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using GenerativeObjects.Practices.LayerSupportClasses.DataLayer;
using GenerativeObjects.Practices.ORMSupportClasses;
using Solid.Data.DataObjects;
using System.Text.RegularExpressions;
using VDS.RDF;
using VDS.RDF.Parsing;
using VDS.RDF.Query;
using VDS.RDF.Writing;
using System.Net;
using System.IO;
using System.Linq;
using GenerativeObjects.Practices.ExceptionHandling;
using GenerativeObjects.Practices.Settings;
using System.Configuration;
using System.Text;
using GenerativeObjects.Practices.LayerSupportClasses;
using Unity;
using System.Globalization;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Security.Common;
using Solid.Feature.Security.Common;
using Solid.BusinessLayer.ORMSupportClasses;
using Unity.Attributes;

namespace Solid.Data.DataProviders.Custom
{
    public class VisitedPlaceDataProvider : DataProvider<VisitedPlaceDataObject>
    {
        [Dependency]
        public IDataFacade DataFacade { get; set; }

        private string GetPropertyFromFilter(string filterpredicate, string property)
        {
            var regexp = new Regex($"{property} == \"(.*?)\"");

            var match = regexp.Match(filterpredicate);

            if (!match.Success)
                return null;

            var uri = match.Groups[1].Value;
            return uri;
        }


        private string GetUserBaseUriFromFilter(string filterpredicate)
        {
            var uri = GetPropertyFromFilter(filterpredicate, "UserProfileUri");
            uri = DataProviderHelper.GetWebIdRootURL(uri);

            return uri;
        }


        protected override int DoCount(LambdaExpression securityFilterExpression, string filterPredicate, object[] filterArguments, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            var userUri = GetUserBaseUriFromFilter(filterPredicate);

            if (userUri == null)
            {
                // search all the users registered in application
                var userNames = DataFacade.GOUserDataProvider.GetCollection(null).Select(u => u.UserName);
                int count = 0;

                foreach (var userName in userNames)
                {
                    try
                    {
                        var userfilter = $"UserProfileUri == \"{userName}\" && {filterPredicate}";
                        count += DoCount(securityFilterExpression, userfilter, filterArguments, context, parameters);
                    }
                    catch(Exception e)
                    { }
                }

                return count;
            }

            string visitedPlaceDocumentName = "myvisitedplaces.ttl";
            string visitedPlaceDocumentUri = $"{userUri}/public/{visitedPlaceDocumentName}";
            string tempfile = null;

            var placeUriFilter = GetPropertyFromFilter(filterPredicate, "PlaceURI");
            var countryUriFilter = GetPropertyFromFilter(filterPredicate, "CountryURI");

            try
            {
                tempfile = DataProviderHelper.DownloadFile(visitedPlaceDocumentUri, ".ttl");

                var g = new Graph();
                g.LoadFromFile(tempfile);
                //UriLoader.Load(g, new Uri(visitedPlaceDocumentUri)); // NOT WORKING ... ??? SOMEHOW SHOULD WORK

                var query = new SparqlParameterizedString();
                query.Namespaces.AddNamespace("go", new Uri("http://generativeobjects.com/apps#"));
                query.Namespaces.AddNamespace("schem", new Uri("http://schema.org"));

                if (placeUriFilter == null && countryUriFilter == null)
                {
                    query.CommandText = @"SELECT count(?visitedplace) AS ?count 
                                        WHERE { 
                                            ?visitedplace a go:VisitedPlace 
                                        } ";
                }
                else if (placeUriFilter != null)
                {
                    query.CommandText = @"SELECT count(?visitedplace) AS ?count 
                                        WHERE { 
                                            ?visitedplace a go:VisitedPlace  ;
                                            <http://dbpedia.org/ontology/Place> @PlaceUri .
                                        } ";

                    query.SetUri("@PlaceUri", new Uri(placeUriFilter));
                }
                else
                {
                    query.CommandText = @"SELECT count(?visitedplace) AS ?count 
                                        WHERE { 
                                            ?visitedplace a go:VisitedPlace  ;
                                            <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> @CountryURI .
                                        } ";

                    query.SetUri("@CountryURI", new Uri(countryUriFilter));
                }

                var results = (SparqlResultSet)g.ExecuteQuery(query);

                var res = results.Single();
                var count = Convert.ToInt32((res.Single().Value as BaseLiteralNode).Value);

                return count;
            }
            finally
            {
                if (File.Exists(tempfile))
                    File.Delete(tempfile);
            }
        }

        protected override void DoDelete(VisitedPlaceDataObject entity, LambdaExpression securityFilterExpression, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            var userUri = DataProviderHelper.GetWebIdRootURL(entity.UserProfileUri);
            string visitedPlaceDocumentName = "myvisitedplaces.ttl";
            string visitedPlaceDocumentUri = $"{userUri}/public/{visitedPlaceDocumentName}";

            StringBuilder sb;
            string payload = "";

            if (!entity.IsNew)
            {
                // existing entity => we need to delete existing entry, before inserting modified one 
                var existingEntity = DoGet(entity, securityFilterExpression, null, context, parameters);

                sb = new StringBuilder();
                sb.AppendLine($":{entity.Id} ");
                
                sb.AppendLine($"   a <http://generativeobjects.com/apps#VisitedPlace> ;");
                sb.AppendLine($"   <http://schema.org/startDate> \"{existingEntity.Date.ToString("yyyy-MM-dd")}\" ;");
                sb.AppendLine($"   <http://schema.org/description> \"\"\"{existingEntity.Description}\"\"\" ; ");
                sb.AppendLine($"   <http://generativeobjects.com/apps#VisitedPlaceType> \"{existingEntity.Typeofplace.ToString()}\" ; ");

                if (existingEntity.Typeofplace == PlaceTypesEnum.Country && entity.CountryURI != null)
                {
                    sb.AppendLine($"   <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> <{existingEntity.CountryURI}> . ");
                }
                else
                {
                    sb.AppendLine($"   <http://dbpedia.org/ontology/Place> <{existingEntity.PlaceURI}> . ");
                }


                payload += $"DELETE DATA {{{sb.ToString()}}} ";
            }

            var token = DataProviderHelper.GetSolidToken();

            var statusPatch = DataProviderHelper.SendPatch(visitedPlaceDocumentUri, payload, token);

            if (statusPatch != HttpStatusCode.OK)
            {
                throw new GOServerException("Failed to delete the visited place information");
            }
        }

        protected override VisitedPlaceDataObject DoGet(VisitedPlaceDataObject entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            var userUri = DataProviderHelper.GetWebIdRootURL(entity.UserProfileUri);
            string visitedPlaceDocumentName = "myvisitedplaces.ttl";
            string visitedPlacesDocumentUri = $"{userUri}/public/{visitedPlaceDocumentName}";
            
            //string visitedPlaceUri = $"{visitedPlacesDocumentUri}#{entity.Id}"; // to be used with UriLoader.Load
            string tempfile = null;

            try
            {
                tempfile = DataProviderHelper.DownloadFile(visitedPlacesDocumentUri, ".ttl");

                var g = new Graph();
                g.LoadFromFile(tempfile);
                //UriLoader.Load(g, new Uri(visitedPlaceDocumentUri)); // NOT WORKING ... ??? SOMEHOW SHOULD WORK

                var query = new SparqlParameterizedString();

                query.CommandText = @"SELECT *
                                      WHERE 
                                        {     
                                            @VisitedPlace   <http://schema.org/startDate> ?Date ;                                          
                                                            <http://schema.org/description> ?Description.

                                            OPTIONAL {
                                                @VisitedPlace <http://generativeobjects.com/apps#VisitedPlaceType> ?PlaceOrCountry .
                                            }
                                            OPTIONAL {
                                                @VisitedPlace <http://dbpedia.org/ontology/Place> ?PlaceURI .
                                            }
                                            OPTIONAL {
                                                @VisitedPlace <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> ?CountryURI .
                                            }   
                                        }";
                //                                                <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> ?CountryURI ;

                string visitedPlaceLocalFileUri = $"file://////{tempfile}#{entity.Id}";
                query.SetUri("VisitedPlace", new Uri(visitedPlaceLocalFileUri));

                var results = (SparqlResultSet)g.ExecuteQuery(query);

                var result = results.SingleOrDefault();

                if (result == null)
                    throw new GOServerException("Cannot load the VisitedPlace");

                var visitedPlace = MapSparqlResultToVisitedPlace(result, mapId: false);
                visitedPlace.Id = entity.Id;
                visitedPlace.UserProfileUri = entity.UserProfileUri;

                var dataset = ApplicationSettings.Container.Resolve<IObjectsDataSet>();
                dataset.AddObject(visitedPlace);

                return visitedPlace;
            }
            finally
            {
                if (File.Exists(tempfile))
                    File.Delete(tempfile);
            }
        }

        protected override DataObjectCollection<VisitedPlaceDataObject> DoGetCollection(LambdaExpression securityFilterExpression, string filterPredicate, object[] filterArguments, string orderByPredicate, int pageNumber, int pageSize, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            var userUri = GetUserBaseUriFromFilter(filterPredicate);

            if (userUri == null)
            {
                // search all the users registered in application
                var userNames = DataFacade.GOUserDataProvider.GetCollection(null).Select(u => u.UserName);
                var toReturn = new DataObjectCollection<VisitedPlaceDataObject>();
                toReturn.ObjectsDataSet = ApplicationSettings.Container.Resolve<IObjectsDataSet>();

                foreach (var userName in userNames)
                {
                    try
                    {
                        var userfilter = $"UserProfileUri == \"{userName}\" && {filterPredicate}";
                        var subvisitedplaces = DoGetCollection(securityFilterExpression, userfilter, filterArguments, orderByPredicate, 0, 0, includes, context, parameters);

                        foreach (var subvisitedplace in subvisitedplaces)
                        {
                            toReturn.Add(subvisitedplace);
                        }
                    }
                    catch (Exception e)
                    { }
                }

                return toReturn;
            }


            string visitedPlaceDocumentName = "myvisitedplaces.ttl";
            string visitedPlaceDocumentUri = $"{userUri}/public/{visitedPlaceDocumentName}";
            string tempfile = null;

            var placeUriFilter = GetPropertyFromFilter(filterPredicate, "PlaceURI");
            var countryUriFilter = GetPropertyFromFilter(filterPredicate, "CountryURI");

            try
            {
                tempfile = DataProviderHelper.DownloadFile(visitedPlaceDocumentUri, ".ttl");

                var g = new Graph();
                g.LoadFromFile(tempfile);
                //UriLoader.Load(g, new Uri(visitedPlaceDocumentUri)); // NOT WORKING ... ??? SOMEHOW SHOULD WORK


                var query = new SparqlParameterizedString();

                if (placeUriFilter == null && countryUriFilter == null)
                {
                    query.CommandText = @"SELECT *
                                      WHERE 
                                        { 
                                            ?VisitedPlace a <http://generativeobjects.com/apps#VisitedPlace> ; 
                                            <http://schema.org/startDate> ?Date;
                                            <http://schema.org/description> ?Description .
                                            OPTIONAL {
                                                ?VisitedPlace <http://generativeobjects.com/apps#VisitedPlaceType> ?PlaceOrCountry .
                                            }
                                            OPTIONAL {
                                                ?VisitedPlace <http://dbpedia.org/ontology/Place> ?PlaceURI .
                                            }
                                            OPTIONAL {
                                                ?VisitedPlace <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> ?CountryURI .
                                           }
                                        } ";
                    ////<http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> ?CountryURI ;
                    if (pageNumber != 0 || pageSize != 0)
                    {
                        query.CommandText += $"LIMIT {pageSize} OFFSET {(pageNumber - 1) * pageSize}";
                    }
                }
                else if (placeUriFilter != null)
                {
                    query.CommandText = @"SELECT *
                                      WHERE 
                                        { 
                                            ?VisitedPlace a <http://generativeobjects.com/apps#VisitedPlace> ; 
                                            <http://dbpedia.org/ontology/Place> @PlaceUri ;
                                            <http://schema.org/startDate> ?Date;
                                            <http://schema.org/description> ?Description .
                                            
                                            OPTIONAL {
                                                ?VisitedPlace <http://generativeobjects.com/apps#VisitedPlaceType> ?PlaceOrCountry .
                                            }
                                        } ";

                    query.SetUri("@PlaceUri", new Uri(placeUriFilter));
                }
                else
                {
                    query.CommandText = @"SELECT *
                                      WHERE 
                                        { 
                                            ?VisitedPlace a <http://generativeobjects.com/apps#VisitedPlace> ; 
                                            <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> @CountryURI ;
                                            <http://schema.org/startDate> ?Date;
                                            <http://schema.org/description> ?Description .

                                            OPTIONAL {
                                                ?VisitedPlace <http://generativeobjects.com/apps#VisitedPlaceType> ?PlaceOrCountry .
                                            }
                                        } ";

                    query.SetUri("@CountryURI", new Uri(countryUriFilter));
                }

                var results = (SparqlResultSet)g.ExecuteQuery(query);

                var toReturn = new DataObjectCollection<VisitedPlaceDataObject>();
                toReturn.ObjectsDataSet = ApplicationSettings.Container.Resolve<IObjectsDataSet>();

                foreach (var result in results)
                {
                    var visitedPlace = MapSparqlResultToVisitedPlace(result);
                    visitedPlace.UserProfileUri = GetPropertyFromFilter(filterPredicate, "UserProfileUri");
                    toReturn.Add(visitedPlace);
                }

                return toReturn;
            }
            finally
            {
                if (File.Exists(tempfile))
                    File.Delete(tempfile);
            }
        }

        private VisitedPlaceDataObject MapSparqlResultToVisitedPlace(SparqlResult result, bool mapId  = true)
        {
            var visitedPlace = new VisitedPlaceDataObject();

            if (mapId)
            {
                visitedPlace.Id = new Guid((result.Where(r => r.Key == "VisitedPlace").Single().Value as UriNode).Uri.Fragment.TrimStart('#'));
            }

            visitedPlace.Date = DateTime.ParseExact((result.Where(r => r.Key == "Date").Single().Value as BaseLiteralNode).Value, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            visitedPlace.Description = (result.Where(r => r.Key == "Description").Single().Value as BaseLiteralNode)?.Value;

            if (result.Where(r => r.Key == "PlaceOrCountry").Count() == 1)
            {
                visitedPlace.Typeofplace = (PlaceTypesEnum)Enum.Parse(typeof(PlaceTypesEnum), (result.Where(r => r.Key == "PlaceOrCountry").Single().Value as BaseLiteralNode)?.Value);
            }

            if (result.Where(r => r.Key == "CountryURI").Count() == 1)
            {
                visitedPlace.CountryURI = (result.Where(r => r.Key == "CountryURI").Single().Value as UriNode).Uri.ToString();
            }

            if (result.Where(r => r.Key == "PlaceURI").Count() == 1)
            {
                visitedPlace.PlaceURI = (result.Where(r => r.Key == "PlaceURI").Single().Value as UriNode).Uri.ToString();
            }

            visitedPlace.IsNew = false;
            visitedPlace.IsDirty = false;

            return visitedPlace;
        }

        protected override VisitedPlaceDataObject DoSave(VisitedPlaceDataObject entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            if (!entity.IsDirty)
                return entity;

            var userUri = DataProviderHelper.GetWebIdRootURL(entity.UserProfileUri);
            string visitedPlaceDocumentName = "myvisitedplaces.ttl";
            string visitedPlaceDocumentUri = $"{userUri}/public/{visitedPlaceDocumentName}";

            StringBuilder sb;
            string payload = "";


            if (!entity.IsNew)
            {
                // existing entity => we need to delete existing entry, before inserting modified one 
                var existingEntity = DoGet(entity, securityFilterExpression, null, context, parameters);

                sb = new StringBuilder();
                sb.AppendLine($":{entity.Id} ");
                
                sb.AppendLine($"   a <http://generativeobjects.com/apps#VisitedPlace> ;");
                sb.AppendLine($"   <http://schema.org/startDate> \"{existingEntity.Date.ToString("yyyy-MM-dd")}\" ;");
                sb.AppendLine($"   <http://schema.org/description> \"\"\"{existingEntity.Description}\"\"\" ; ");
                sb.AppendLine($"   <http://generativeobjects.com/apps#VisitedPlaceType> \"{existingEntity.Typeofplace.ToString()}\" ; ");

                if (existingEntity.Typeofplace == PlaceTypesEnum.Country && entity.CountryURI != null)
                {
                    sb.AppendLine($"   <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> <{existingEntity.CountryURI}> . ");
                }
                else
                {
                    sb.AppendLine($"   <http://dbpedia.org/ontology/Place> <{existingEntity.PlaceURI}> . ");
                }
               
                payload += $"DELETE DATA {{{sb.ToString()}}} ";
            }


            sb = new StringBuilder();
            sb.AppendLine($":{entity.Id} ");
            sb.AppendLine($"   a <http://generativeobjects.com/apps#VisitedPlace> ;");
            sb.AppendLine($"   <http://schema.org/startDate> \"{entity.Date.ToString("yyyy-MM-dd")}\" ;");
            sb.AppendLine($"   <http://schema.org/description> \"\"\"{entity.Description}\"\"\" ; ");
            sb.AppendLine($"   <http://generativeobjects.com/apps#VisitedPlaceType> \"{entity.Typeofplace.ToString()}\" ; ");

            if (entity.Typeofplace == PlaceTypesEnum.Country && entity.CountryURI != null)
            {
                sb.AppendLine($"   <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> <{entity.CountryURI}> . ");
            }
            else
            {
                sb.AppendLine($"   <http://dbpedia.org/ontology/Place> <{entity.PlaceURI}> . ");
            }

            payload += $"INSERT DATA {{{sb.ToString()}}}";

            var token = DataProviderHelper.GetSolidToken();

            var statusPatch = DataProviderHelper.SendPatch(visitedPlaceDocumentUri, payload, token);

            if (statusPatch != HttpStatusCode.OK)
            {
                throw new GOServerException("Failed to save the visited place information");
            }

            // TODO : re back from store instead ?
            entity.IsDirty = false;
            entity.IsNew = false;
        
            return entity;
        }
    }
}

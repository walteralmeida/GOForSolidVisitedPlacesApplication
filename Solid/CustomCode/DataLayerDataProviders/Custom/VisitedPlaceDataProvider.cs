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

namespace Solid.Data.DataProviders.Custom
{
    public class VisitedPlaceDataProvider : DataProvider<VisitedPlaceDataObject>
    {

        private string GetUserProfileUriFromFilter(string filterpredicate)
        {
            var regexp = new Regex("UserProfileUri == \"(.*)\"");

            var match = regexp.Match(filterpredicate);

            return match.Success ? match.Groups[1].Value.Replace("||", "://") : null;
        }


        protected override int DoCount(LambdaExpression securityFilterExpression, string filterPredicate, object[] filterArguments, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            var userUri = GetUserProfileUriFromFilter(filterPredicate);
            string visitedPlaceDocumentName = "myvisitedplaces.ttl";

            DataProviderHelper.EnsurePublicTypeRegistration(userUri, "goapp-visitedplaces", "http://schema.org/TextDigitalDocument", visitedPlaceDocumentName);

            string visitedPlaceDocumentUri = $"{userUri}/public/{visitedPlaceDocumentName}";

            var g = new Graph();
            UriLoader.Load(g, new Uri(visitedPlaceDocumentUri));

            var query = new SparqlParameterizedString();
            query.Namespaces.AddNamespace("go", new Uri("http://generativeobjects.com/apps#"));
            query.Namespaces.AddNamespace("schem", new Uri("http://schema.org"));

            query.CommandText = "SELECT count(?visitedplace) AS ?count WHERE { ?visitedplace a go:VisitedPlace } ";

            var results = (SparqlResultSet)g.ExecuteQuery(query);

            var res = results.Single();
            var count = Convert.ToInt32((res.Single().Value as BaseLiteralNode).Value);

            return count;
        }

        protected override void DoDelete(VisitedPlaceDataObject entity, LambdaExpression securityFilterExpression, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            throw new NotImplementedException();
        }

        protected override VisitedPlaceDataObject DoGet(VisitedPlaceDataObject entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            var userUri = entity.UserProfileUri.Replace("||", "://");
            string visitedPlaceDocumentName = "myvisitedplaces.ttl";

            DataProviderHelper.EnsurePublicTypeRegistration(userUri, "goapp-visitedplaces", "http://schema.org/TextDigitalDocument", visitedPlaceDocumentName);

            string visitedPlacesDocumentUri = $"{userUri}/public/{visitedPlaceDocumentName}";
            string visitedPlaceUri = $"{visitedPlacesDocumentUri}#{entity.Id}";

            var g = new Graph();

            UriLoader.Load(g, new Uri(visitedPlacesDocumentUri));

            var query = new SparqlParameterizedString();

            query.CommandText = @"SELECT ?Date ?Description ?CountryURI
                                      WHERE 
                                        {     
                                            @VisitedPlace   <http://schema.org/startDate> ?Date ;                                          
                                                            <http://schema.org/description> ?Description;
                                                            <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> ?CountryURI .
                                        }";

            query.SetUri("VisitedPlace", new Uri(visitedPlaceUri));

            var results = (SparqlResultSet)g.ExecuteQuery(query);

            var result = results.SingleOrDefault();

            if (result == null)
                throw new GOServerException("Cannot load the VisitedPlace");

            var visitedPlace = MapSparqlResultToVisitedPlace(result, mapId : false);
            visitedPlace.Id = entity.Id;
            visitedPlace.UserProfileUri = userUri.Replace("://", "||").Replace("/", "|");

            var dataset = ApplicationSettings.Container.Resolve<IObjectsDataSet>();
            dataset.AddObject(visitedPlace);

            return visitedPlace;
        }

        protected override DataObjectCollection<VisitedPlaceDataObject> DoGetCollection(LambdaExpression securityFilterExpression, string filterPredicate, object[] filterArguments, string orderByPredicate, int pageNumber, int pageSize, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            var userUri = GetUserProfileUriFromFilter(filterPredicate);
            string visitedPlaceDocumentName = "myvisitedplaces.ttl";

            DataProviderHelper.EnsurePublicTypeRegistration(userUri, "goapp-visitedplaces", "http://schema.org/TextDigitalDocument", visitedPlaceDocumentName);

            string visitedPlaceDocumentUri = $"{userUri}/public/{visitedPlaceDocumentName}";

            var g = new Graph();
            UriLoader.Load(g, new Uri(visitedPlaceDocumentUri));


            var query = new SparqlParameterizedString();

            query.CommandText = @"SELECT ?VisitedPlace ?Date ?Description ?CountryURI
                                      WHERE 
                                        { 
                                            ?VisitedPlace a <http://generativeobjects.com/apps#VisitedPlace> ; 
                                            <http://schema.org/startDate> ?Date;
                                            <http://schema.org/description> ?Description;
                                            <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> ?CountryURI .
                                        } ";

            if (pageNumber != 0 || pageSize != 0)
            {
                query.CommandText += $"LIMIT {pageSize} OFFSET {(pageNumber - 1) * pageSize}";
            }

            var results = (SparqlResultSet)g.ExecuteQuery(query);

            var toReturn = new DataObjectCollection<VisitedPlaceDataObject>();
            toReturn.ObjectsDataSet = ApplicationSettings.Container.Resolve<IObjectsDataSet>();

            foreach (var result in results)
            {
                var visitedPlace = MapSparqlResultToVisitedPlace(result);
                visitedPlace.UserProfileUri = userUri.Replace("://", "||").Replace("/", "|");
                toReturn.Add(visitedPlace);
            }

            return toReturn;
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
            visitedPlace.CountryURI = (result.Where(r => r.Key == "CountryURI").Single().Value as UriNode).Uri.ToString().Replace("://", "||").Replace("/", "|");
            visitedPlace.IsNew = false;
            visitedPlace.IsDirty = false;

            return visitedPlace;
        }

        protected override VisitedPlaceDataObject DoSave(VisitedPlaceDataObject entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            var userUri = entity.UserProfileUri.Replace("||", "://");
            string visitedPlaceDocumentName = "myvisitedplaces.ttl";

            DataProviderHelper.EnsurePublicTypeRegistration(userUri, "goapp-visitedplaces", "http://schema.org/TextDigitalDocument", visitedPlaceDocumentName);

            string visitedPlaceDocumentUri = $"{userUri}/public/{visitedPlaceDocumentName}";
            
            StringBuilder sb = new StringBuilder();
            sb.AppendLine($":{entity.Id} ");
            sb.AppendLine($"   a <http://generativeobjects.com/apps#VisitedPlace> ;");
            sb.AppendLine($"   <http://schema.org/startDate> \"{entity.Date.ToString("yyyy-MM-dd")}\" ;");
            sb.AppendLine($"   <http://schema.org/description> \"\"\"{entity.Description}\"\"\" ; ");
            sb.AppendLine($"   <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> <{entity.CountryURI.Replace("||","://").Replace("|", "/")}> . ");
            
            string payload;

            //if (entity.IsNew)
            {
                payload = $"INSERT DATA {{{sb.ToString()}}}";
            }

            string token = ConfigurationManager.AppSettings[$"{userUri}-Token"];

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

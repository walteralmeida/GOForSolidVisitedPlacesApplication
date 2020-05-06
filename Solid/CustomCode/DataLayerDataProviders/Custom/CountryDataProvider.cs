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

using VDS.RDF.Parsing;
using VDS.RDF.Query;
using VDS.RDF;
using System.Linq;
using GenerativeObjects.Practices.LayerSupportClasses;
using Unity;

namespace Solid.Data.DataProviders.Custom
{
    public class CountryDataProvider : DataProvider<CountryDataObject>
    {

        protected override int DoCount(LambdaExpression securityFilterExpression, string filterPredicate, object[] filterArguments, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            int count;

            SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");
            
            //Make a SELECT query against the Endpoint
            SparqlResultSet results = endpoint.QueryWithResultSet("SELECT count(?country) WHERE { ?country a <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> }");

            var res = results.Single();
            count = Convert.ToInt32((res.Single().Value as BaseLiteralNode).Value);

            return count;
        }

        protected override void DoDelete(CountryDataObject entity, LambdaExpression securityFilterExpression, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            throw new NotImplementedException();
        }

        protected override CountryDataObject DoGet(CountryDataObject entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            var uri = entity.URI;

            SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");

            string queryString = @"SELECT ?countryName, ?longName, ?flag, ?populationTotal, MAX(?populationDensity) as ?density ,  ?abstract
                  WHERE {
                                ?country rdfs:label ?countryName .

                                FILTER langMatches(lang(?countryName), 'en')

                                OPTIONAL {
                                ?country dbo:longName ?longName.
                                ?country dbo:abstract ?abstract.
                                ?country dbo:flag ?flag.
                                ?country dbo:populationTotal ?populationTotal .
                                ?country dbo:populationDensity ?populationDensity

                                FILTER langMatches(lang(?longName), 'en')
                                FILTER langMatches(lang(?abstract), 'en')
                                }
                                }
                                ";

            queryString = queryString.Replace("?country ", $"<{uri}> ");

            //Make a SELECT query against the Endpoint
            SparqlResultSet results = endpoint.QueryWithResultSet(queryString);

            var result = results.Single();

            var country = new CountryDataObject();
            var dataset = ApplicationSettings.Container.Resolve<IObjectsDataSet>();
            dataset.AddObject(country);

            country.URI = entity.URI;
            country.Name = (result.Where(r => r.Key == "countryName").Single().Value as BaseLiteralNode).Value;
            country.LongName = (result.Where(r => r.Key == "longName").Single().Value as BaseLiteralNode)?.Value;
            country.Abstract = (result.Where(r => r.Key == "abstract").Single().Value as BaseLiteralNode)?.Value;
            country.IsNew = false;
            country.IsDirty = false;

            return country;
        }

        protected override DataObjectCollection<CountryDataObject> DoGetCollection(LambdaExpression securityFilterExpression, string filterPredicate, object[] filterArguments, string orderByPredicate, int pageNumber, int pageSize, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            if (filterPredicate.Contains("(@0.Contains(outerIt.URI))"))
            {
                var countries = new DataObjectCollection<CountryDataObject>();
                countries.ObjectsDataSet = ApplicationSettings.Container.Resolve<IObjectsDataSet>();

                foreach (var arg in filterArguments)
                {
                    if ((arg as string[]).Length == 0)
                        continue;

                    var uri = (arg as string[])[0];
                    var country = DoGet(new CountryDataObject(uri), null, includes, context, parameters);
                    countries.Add(country);
                }

                return countries;
            }

            SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");

            string query = @"SELECT ?country, ?countryName, ?longName, ?flag, ?populationTotal, MAX(?populationDensity) as ?density ,  ?abstract
                             WHERE {
                                ?country a <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> .
                                ?country rdfs:label ?countryName .

                                FILTER langMatches(lang(?countryName), 'en')

                                OPTIONAL {
                                ?country dbo:longName ?longName.
                                ?country dbo:abstract ?abstract.
                                ?country dbo:flag ?flag.
                                ?country dbo:populationTotal ?populationTotal .
                                ?country dbo:populationDensity ?populationDensity

                                FILTER langMatches(lang(?longName), 'en')
                                FILTER langMatches(lang(?abstract), 'en')
                                }
                                }
                                ORDER BY ?countryName
                                ";

            if (pageNumber != 0 || pageSize != 0)
            {
                query += $"LIMIT {pageSize} OFFSET {(pageNumber - 1) * pageSize}";
            }

            //Make a SELECT query against the Endpoint
            SparqlResultSet results = endpoint.QueryWithResultSet(query);

            var toReturn = new DataObjectCollection<CountryDataObject>();
            toReturn.ObjectsDataSet = ApplicationSettings.Container.Resolve<IObjectsDataSet>();

            foreach (var result in results)
            {
                var country = new CountryDataObject();

                country.URI = (result.Where(r => r.Key == "country").Single().Value as UriNode).Uri.ToString();
                country.Name = (result.Where(r => r.Key == "countryName").Single().Value as BaseLiteralNode).Value;
                country.LongName = (result.Where(r => r.Key == "longName").Single().Value as BaseLiteralNode)?.Value;
                country.Abstract = (result.Where(r => r.Key == "abstract").Single().Value as BaseLiteralNode)?.Value;
                country.IsNew = false;
                country.IsDirty = false;

                toReturn.Add(country);
            }

            return toReturn;
        }

        protected override CountryDataObject DoSave(CountryDataObject entity, LambdaExpression securityFilterExpression, List<string> includes, IObjectsDataSet context, Dictionary<string, object> parameters)
        {
            throw new NotImplementedException();
        }
    }
}

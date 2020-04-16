using GenerativeObjects.Practices.ExceptionHandling;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using VDS.RDF;
using VDS.RDF.Query;

namespace Solid.Data.DataProviders.Custom
{
    public static class DataProviderHelper
    {
        public static string DownloadFile(string remoteUri, string extension = null)
        {
            // Create a new WebClient instance.
            WebClient myWebClient = new WebClient();

            // Download the Web resource and save it into the current filesystem folder.
            var tempFile = Path.GetTempFileName();

            if (!String.IsNullOrEmpty(extension))
            {
                var oldtempFile = tempFile;
                tempFile = tempFile.Substring(0, tempFile.Length - 4) + extension;
                File.Move(oldtempFile, tempFile);

            }

            //myWebClient.Headers.Add("Authorization", "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJiNWJkMmU4YWY4MWNiYmYxMDA0NDU1ZGM5MTlkODM4YSIsImF1ZCI6Imh0dHBzOi8vd2FsdGVyYWxtZWlkYS5pbnJ1cHQubmV0IiwiZXhwIjoxNTg2ODEyNzM2LCJpYXQiOjE1ODY4MDkxMzYsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluWmFhVU5rWkdWSWJIUTBJbjAuZXlKcGMzTWlPaUpvZEhSd2N6b3ZMMmx1Y25Wd2RDNXVaWFFpTENKemRXSWlPaUpvZEhSd2N6b3ZMM2RoYkhSbGNtRnNiV1ZwWkdFdWFXNXlkWEIwTG01bGRDOXdjbTltYVd4bEwyTmhjbVFqYldVaUxDSmhkV1FpT2lKaU5XSmtNbVU0WVdZNE1XTmlZbVl4TURBME5EVTFaR001TVRsa09ETTRZU0lzSW1WNGNDSTZNVFU0T0RBd05qY3hPQ3dpYVdGMElqb3hOVGcyTnprM01URTRMQ0pxZEdraU9pSTJPV1ZpWlRKak16YzRNekUzTWpCaElpd2libTl1WTJVaU9pSmxZbGx4YVhsNVgyZ3phR1ZPWDJ4dVYyMVJNMWswWDFOdFZGaENZV3RoUjE5WmJrRXpUMDl2ZG5Weklpd2lZWHB3SWpvaVlqVmlaREpsT0dGbU9ERmpZbUptTVRBd05EUTFOV1JqT1RFNVpEZ3pPR0VpTENKamJtWWlPbnNpYW5kcklqcDdJbUZzWnlJNklsSlRNalUySWl3aVpTSTZJa0ZSUVVJaUxDSmxlSFFpT25SeWRXVXNJbXRsZVY5dmNITWlPbHNpZG1WeWFXWjVJbDBzSW10MGVTSTZJbEpUUVNJc0ltNGlPaUo2TW10RllWcGllVXMyV1ZaR05IbFBiM2RNVUU1NGJEY3pkamhVZEVKZmExSjRWR3BCYWtvMFYyMW9kbkJRYVVOVldFd3RkRmxzV2psalFtY3dWbkl4Y2kxM2IwMW9hVlIzY0dKa1pWQldiMDh6WTNORFgxTjNlRTVMZGs1RlNrdE1VMEYyWXpjeFowdDBhazFvTTNZNFpISlVTVUowZFc1aWFsOURkMEk0UnpKNlNEVk5SRFF4VDFGb01sOU1ka1IwTWs5RU5rNTVhSFJmTFhRMlZHVnZRbEp1VmxOamVFeHZVVUZPYzJkMFVVUnBSa0prY1daNGQyWTFVMDVSV0MxMU9XcEJXbWhzTVZBd1RUTmxiQzFKYlZZNFdtMXNNbVZZZDA5ZlQxTXlhME5LZWtwSmEyOUZWRkJWVm1OaFZYUkRRME5QTlhKVFUySlBTakZKVFhWek9WcHVSSFY2UlMxM09VTnBka3AyWkZCT2MxOXVVMVIwUm5SQ2MybHpkMVJsWm5oTmVqSk9ORWMwWVRoVFl6WlFZVXhRYld0clpuRnlNSEp2T0d4VFFVVjZSMnMwZEZGcE5XWk1hWFpLZWpGNmF5MVpkWGNpZlgwc0ltRjBYMmhoYzJnaU9pSjRPWE5pUldZeVltWXphWGswVkcxaWNXUTBUV2RSSW4wLmg5UWtXNmU5aThqTERkTFUxT2pSQ2RDN0JmX3U4WDMwbC1LOUlsYnBaNkZ0RXdvalZBNGoydlZsY25GV0NvVDFaZXZ0UHNmUmUwS3h5NjNkcU5OcFU3dmg2VkZmeGFlOU9MTWdnTFFudHlzbmsydEFQbTJmSGswZ2xBU3VkTkpaMFdxTmlZbFhPbXg2YzV1THpvMHlfLUM1aGJvRkZGWGhiMUtLNlpoVE85RmRVNjVoTHJXcXRfVW1jUFl2dDEyRmM4SkFoRlZkZWdSdkkyakh6dDJCRzZEakcxVDVEaHhiel93aF9GNkpYaEVlSjVteXVCZi1lRl9qbkYtM3VtR0lkWGhuZTJDV01PNU81dkRyWWx4TDdwRjdwTHBYbVA5U09yYkxHUVVhX29GX212R3Z5Wm1MaXBzU2tWaXZPZUwwYkVoWVR6ZWY5bkdxaFd1VXRIWV80ZyIsInRva2VuX3R5cGUiOiJwb3AifQ.e4KbyieL6-ajSNanN6yH1KYTBEbAN6ZKl5DPBA4xGTTeTxOkfnn8Xp9F0FIFhZO4E66_72NIAg6T5uIy2pxuarbnbV-EHCT_hZvU2Zj_823wS2ZV8QoB4cJLHBZN8wJpeMlXgvUnY8Ftx3I2nEKP8A50ZhDtJs_oTP_iqkuHEw2C3tjoXZuf0oP6TpqhumXRtuvXyPPh8v0J4bPyQn0CW2QX3ZF71HYDkxYUEBIAHhkuOdnZy1cKQRP1j91aOEiMTxtTqlIpkRd2l_q1AXzCWKvNe1-8NgECs8vWRv2PYIf2p66z5u0huq2Wjq2S9gNd69KYZnpyFqCGKjrPWMDh7Q");
            //myWebClient.Headers.Add(HttpRequestHeader.Cookie, "nssidp.sid=s%3AB8zEMZScbRPyeOq2XGO8At4Rvc-p_FHu.X5LJHjUb8E3SowsfylNKH9DYfBVzd2SoPPwsOvRmQNg");
            myWebClient.DownloadFile(remoteUri, tempFile);

            return tempFile;
        }

        public static HttpStatusCode SendPatch(string url, string payload, string token)
        {
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "PATCH";
            request.ContentType = "application/sparql-update";
            request.Headers["Authorization"] = token;

            if (!String.IsNullOrEmpty(payload))
            {
                var bytes = Encoding.UTF8.GetBytes(payload);
                request.ContentLength = bytes.Length;

                using (var requestStream = request.GetRequestStream())
                {
                    requestStream.Write(bytes, 0, bytes.Length);
                }
            }

            var response = (HttpWebResponse) request.GetResponse();

            return response.StatusCode;
        }

        public static HttpStatusCode SendPost(string url, string filename, string payload, string token)
        {
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            request.ContentType = "text/turtle";
            request.Headers["Authorization"] = token;
            request.Headers["Slug"] = filename;

            if (!String.IsNullOrEmpty(payload))
            {
                var bytes = Encoding.UTF8.GetBytes(payload);
                request.ContentLength = bytes.Length;

                using (var requestStream = request.GetRequestStream())
                {
                    requestStream.Write(bytes, 0, bytes.Length);
                }
            }

            var response = (HttpWebResponse)request.GetResponse();

            return response.StatusCode;
        }

        public static HttpStatusCode SendHead(string url, string token)
        {
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "HEAD";
            request.Headers["Authorization"] = token;

            try
            {
                var response = (HttpWebResponse)request.GetResponse();

                return response.StatusCode;
            }
            catch
            {
                return HttpStatusCode.NotFound;
            }
        }


        public static void EnsurePublicTypeRegistration(string userUri, string registrationName, string registrationType, string registrationLocation)
        {
            // going too fast to publicTypeIndex. should follow this : https://github.com/solid/solid/blob/master/proposals/data-discovery.md
            var publicTypeIndexUri = $"{userUri}/settings/publicTypeIndex.ttl";

            var tempFile = DataProviderHelper.DownloadFile(publicTypeIndexUri, ".ttl");

            try
            {
                var g = new Graph();
                g.LoadFromFile(tempFile);

                var query = new SparqlParameterizedString();
                query.Namespaces.AddNamespace("s", new Uri("http://www.w3.org/ns/solid/terms#"));
                query.Namespaces.AddNamespace("schem", new Uri("http://schema.org"));

                              //  ?reg < http://www.w3.org/ns/solid/terms#forClass> <http://schema.org/TextDigitalDocument>.
                              //  ?reg < http://www.w3.org/ns/solid/terms#instance> <file:///C:/public/visitedplaces.ttl>.

                query.CommandText =
                        @"SELECT ?reg WHERE 
                            { 
                                ?reg s:forClass @type .
                                ?reg s:instance @location .
                            }";

                // file:///C:/public/notes.ttl => the URI contains file:///C: because it is made relative to where the document is, and here we downloaded it to local file ...
                query.SetUri("location", new Uri($"file:///C:/public/{registrationLocation}"));
                query.SetUri("type", new Uri(registrationType));

                var registrationExists = ((SparqlResultSet)g.ExecuteQuery(query)).Any();

                string token = ConfigurationManager.AppSettings[$"{userUri}-Token"];

                if (!registrationExists)
                {
                    // create the type registration
                    string payload = $"INSERT DATA {{:{registrationName} a <http://www.w3.org/ns/solid/terms#TypeRegistration>; <http://www.w3.org/ns/solid/terms#forClass> <http://schema.org/TextDigitalDocument> ; <http://www.w3.org/ns/solid/terms#instance> </public/{registrationLocation}> . }}";
                    var statusPatch = DataProviderHelper.SendPatch(publicTypeIndexUri, payload, token);

                    if (statusPatch != HttpStatusCode.OK)
                    {
                        throw new GOServerException("PATCH Failed");
                    }
                }

                var documentUri = $"{userUri}/public/{registrationLocation}";

                // verify the document exists
                var status = DataProviderHelper.SendHead(documentUri, token);

                if (status != HttpStatusCode.OK)
                {
                    // create the document file otherwise
                    string payload = @"@prefix : <#>.
                                        @prefix schem: <http://schema.org/>.
                                        @prefix XML: <http://www.w3.org/2001/XMLSchema#>.
                                        @prefix go: <http://generativeobjects.com/apps#>.";

                    status = DataProviderHelper.SendPost($"{userUri}/public/", registrationLocation, payload, token);

                    if (status != HttpStatusCode.OK)
                    {
                        throw new GOServerException("POST Failed");
                    }
                }

            }
            finally
            {
                if (File.Exists(tempFile))
                    File.Delete(tempFile);
            }

        }

    }
}

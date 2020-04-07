 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Web;
using System.IO;
using System.IO.Compression;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using GenerativeObjects.Practices.DependencyInjection;
using GenerativeObjects.Practices.Settings;
using GenerativeObjects.Practices.ExceptionHandling;
using GenerativeObjects.Practices.ORMSupportClasses;
using System.Web.SessionState;
using System.Configuration;
using GenerativeObjects.Practices.LayerSupportClasses.ServiceLayer;
using GenerativeObjects.Practices.LayerSupportClasses;
using GenerativeObjects.Practices.LayerSupportClasses.Features.Storage.Common;
using Unity;

namespace Solid.ServiceLayer.WebHandlers
{
    public class JsonGOFileUploaderServiceHandler : ApiHandler
    {
		// Current Path is : hostname/version/ApplicationName/GOFileUploader/api/

        private string _directoryToSaveDocs = HttpContext.Current.Server.MapPath("../../files/");

        public override void DoProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json"; // Warning : IE8 doesn't recognize application/json ContentType
            context.Response.ContentEncoding = Encoding.UTF8;

			if (context.Request.HttpMethod != "POST")
				return;

			// Enable GZip Compression if client support it
            var acceptGZip = HttpContext.Current.Request.Headers["Accept-Encoding"] != null && HttpContext.Current.Request.Headers["Accept-Encoding"].Contains("gzip");
			var methodName = context.Request.Path.Contains("?") ? context.Request.Path.Substring(0, context.Request.Path.Length - context.Request.Path.IndexOf('?')) : context.Request.Path;
            methodName = methodName.Substring(methodName.LastIndexOf("/") + 1, methodName.Length - methodName.LastIndexOf("/") - 1);
            methodName = methodName.Substring(0, methodName.Length - ".json".Length);
			var ufi = new UploadFileInfo();
    		ufi.InternalName = Guid.NewGuid().ToString();
			var file_path = "";
            
 
            switch (methodName)
            {
				case "UploadFile":
                    ufi.FileSize = context.Request.ContentLength;
                    file_path = _directoryToSaveDocs + ufi.InternalName;
					// type will be defined during the SaveFile.
                    WriteResponse(context, SaveFile(context, ufi, file_path));
					break;
				default:
					throw new ResourceNotFoundException();
			}
        }

		public static void WriteResponse(HttpContext context, string jsonData)
		{
			// case jsonp
			if (context.Request["callback"] != null)
                context.Response.Write(String.Format("{0}({1});", context.Request["callback"], jsonData));
            else
                context.Response.Write(jsonData);
		}

		public class UploadFileInfo
        {
            public string InternalName { get; set; }
            public string ClientName { get; set; }
            public long FileSize { get; set; }
            public string Type { get; set; }
        }

		private static Int32 IndexOf(Byte[] buffer, Int32 len, Byte[] boundaryBytes)
        {
            for (Int32 i = 0; i <= len - boundaryBytes.Length; i++)
            {
                Boolean match = true;
                for (Int32 j = 0; j < boundaryBytes.Length && match; j++)
                {
                    match = buffer[i + j] == boundaryBytes[j];
                }

                if (match)
                {
                    return i;
                }
            }

            return -1;
        }

		private static string SaveFile(HttpContext context, UploadFileInfo ufi, string file_path)
        {
	        using (StreamReader reader = new StreamReader(context.Request.InputStream))
            {
                var boundary = "--" + context.Request.ContentType.Split(';')[1].Split('=')[1];
                Byte[] boundaryBytes = context.Request.ContentEncoding.GetBytes(boundary);
                var boundaryLen = boundaryBytes.Length;
                Byte[] buffer = new Byte[1024];
                Int32 len = context.Request.InputStream.Read(buffer, 0, 1024);
                Int32 startPos = -1;
				// Find start boundary
                while (true)
                {
                    if (len == 0)
                    {
                        throw new Exception("Start Boundaray Not Found");
                    }

                    startPos = IndexOf(buffer, len, boundaryBytes);
                    if (startPos >= 0)
                    {
                        break;
                    }
                    else
                    {
                        Array.Copy(buffer, len - boundaryLen, buffer, 0, boundaryLen);
                        len = context.Request.InputStream.Read(buffer, boundaryLen, 1024 - boundaryLen);
                    }
                }

                // Skip four lines (Boundary, Content-Disposition, Content-Type, and a blank)
                for (Int32 i = 0; i < 4; i++)
                {
                    while (true)
                    {
                        if (len == 0)
                        {
                            throw new Exception("Preamble not Found.");
                        }

                        startPos = Array.IndexOf(buffer, context.Request.ContentEncoding.GetBytes("\n")[0], startPos);
                        if (startPos >= 0)
                        {
                            startPos++;
							if (i == 0) // Content-Disposition: ...; name=...;  filename="\"...\"
                            {
                                var dest = new Byte[Array.IndexOf(buffer, context.Request.ContentEncoding.GetBytes("\r")[0], startPos) - startPos];
                                Array.Copy(buffer, startPos, dest, 0, Array.IndexOf(buffer, context.Request.ContentEncoding.GetBytes("\r")[0], startPos) - startPos);
                                var filename = System.Text.Encoding.UTF8.GetString(dest).Split(';')[2].Trim(); // Get the filename parameter
                                filename = filename.Split('=')[1].Trim('\"'); // remove unused "
                                ufi.ClientName = filename;
								ufi.Type = Path.GetExtension(filename); // get the extension of the file.
								// Verify Type here ?

                                file_path = String.Concat(file_path, ufi.Type);
                            }
							break;

                        }
                        else
                        {
                            len = context.Request.InputStream.Read(buffer, 0, 1024);
                        }
                    }
                }

				 // Default GO defined storage container is "files", which is used if we don't find a "StorageContainer" override in web.config
                string storageContainerName = String.IsNullOrEmpty(ConfigurationManager.AppSettings["StorageContainer"]) ? "files" : ConfigurationManager.AppSettings["StorageContainer"];
                string fsPath = String.Format("{0}{1}/{2}{3}", ServicePath.ProjectBaseURL(), storageContainerName, ufi.InternalName, ufi.Type);

				using (var fs = ApplicationSettings.Container.Resolve<IStorageProvider>().GetFileStream(fsPath, FileMode.Create))
	            {
                    Array.Copy(buffer, startPos, buffer, 0, len - startPos);
                    len = len - startPos;

                    while (true)
                    {
                        Int32 endPos = IndexOf(buffer, len, boundaryBytes);
                        if (endPos >= 0)
                        {
							// -2 is to take into account the newline before end boundary (\r\n, 2 chars)
                            if (endPos-2 > 0)
                            {
                                fs.Write(buffer, 0, endPos-2);
                            }
                            break;
                        }
                        else if (len <= boundaryLen)
                        {
                            throw new Exception("End Boundaray Not Found");
                        }
                        else
						{
                            fs.Write(buffer, 0, len - boundaryLen);
                            Array.Copy(buffer, len - boundaryLen, buffer, 0, boundaryLen);
                            len = context.Request.InputStream.Read(buffer, boundaryLen, 1024 - boundaryLen) + boundaryLen;
                        }
                    }

					fs.Close();
                }

				ufi.InternalName = String.Concat(ufi.InternalName, ufi.Type);

				string response = String.Format("{{\"{0}\" : \"{1}\", \"{2}\" : {3}, \"{4}\" : \"{5}\"}}", "internalName", ufi.InternalName, "fileSize", ufi.FileSize, "clientName", ufi.ClientName);

				// Legacy support for UploadDocURL
                if (!String.IsNullOrEmpty(ConfigurationManager.AppSettings["UploadDocURL"]))
                {
                    string url = ConfigurationManager.AppSettings["UploadDocURL"] + ufi.InternalName;
					response = String.Format("{{\"{0}\" : \"{1}\", \"{2}\" : {3}, \"{4}\" : \"{5}\", \"{6}\" : \"{7}\"}}", "internalName", ufi.InternalName, "fileSize", ufi.FileSize, "clientName", ufi.ClientName, "url", url);
                }

				return response;
            }
        }

		
        public override bool IsReusable
        {
            // To enable pooling, return true here.
            // This keeps the handler in memory.
            get { return true; }
        }
    }
}





 

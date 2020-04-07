using System;
using System.Text;
using System.Net;
using System.IO;
using GenerativeObjects.Practices.ExceptionHandling;
using Newtonsoft.Json;
using Solid.BusinessLayer.ORMSupportClasses;
namespace Solid.BusinessLayer.Components.Server
{

	/// <summary>
	/// This is used in order to handle reports.
	/// </summary>
    public partial class GOReportsHelper : BaseServerComponent, IGOReportsHelper 
    {
		/// <summary>
        /// GetEmbeddedReportUrl Method
		/// </summary>
		/// <param name="reportId"></param>
        /// <returns></returns>		
		public System.String GetEmbeddedReportUrl(System.Guid reportId, string payload) 
		{
			// No reports defined
			return null;				
		}
	}
}

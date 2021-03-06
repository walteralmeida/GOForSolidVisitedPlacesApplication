﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Solid.Data.DataObjects;
using GenerativeObjects.Practices.ORMSupportClasses;


namespace Solid.BusinessLayer.Components.Server
{
    /// <summary>
	/// GOReportsHelper Component
	/// System Component for Solid Project to handle reports 
	/// </summary>
	public partial interface IGOReportsHelper 
    {
		/// <summary>
        /// GetEmbeddedReportUrl Method
		/// Get a report embedded URL 
		/// </summary>
		/// <param name="reportId"></param>
        /// <returns></returns>		
		/// <param name="payload"></param>
        /// <returns></returns>		
		System.String GetEmbeddedReportUrl(System.Guid reportId, System.String payload);
		
	}

	/// <summary>
	/// IGOReportsHelper  
	/// Custom code can get IGOReportsHelper instances from the Unity Container
	/// But resolved instances from the container are actually surrogate (proxy) implementation which perform security checks before calling the underlying component class 'raw' implementation.
	/// But sometimes in custom code it is convenient to be able to access the raw component (to call public methods that are not published as part of the web-facing API, for example)
	/// So that's what this ComponentClass getter does i.e. 
	/// Given an IGOReportsHelper  interface instance, IGOReportsHelper.ComponentClass gives you the underlying GOReportsHelper implementation class.
	/// </summary>
	public partial interface IGOReportsHelper { GOReportsHelper ComponentClass { get; } }

	/// <summary>
	/// GOReportsHelper.ComponentClass
	/// See above description for IGOReportsHelper.ComponentClass
	/// The raw implementation just returns itself. 
	/// </summary>
	public partial class GOReportsHelper { public GOReportsHelper ComponentClass { get { return this; } } }
}

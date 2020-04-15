﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using GenerativeObjects.Practices.LayerSupportClasses.Features.Security.Common;
using Solid.Data.DataObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace Solid.Feature.Security.Common
{
    public class AppUserClaims : UserClaims
    {
		public System.String GivenName { get; set; }
		
		/// <summary>
        /// Gets a list of Claim from the provided GOUser
        /// </summary>
        public static IEnumerable<Claim> GetExtraUserClaims(GOUserDataObject user)
        {
			var claims = new List<Claim>();

			// Handling GivenName claim
			var givenNameString = user.UserName;
			claims.Add(new Claim("GivenName", HttpUtility.UrlEncode(givenNameString)));
			return claims;
		}

		/// <summary>
        /// Tries to set the extra claims from the given principal
        /// </summary>
		public void TryParseExtraUserClaims(ClaimsPrincipal principal)
        {
			try 
			{
				this.GivenName = HttpUtility.UrlDecode(principal.Claims.Where(c => c.Type == "GivenName").Single().Value.ToString());
			}
			catch { }
		}		
    }
}
 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Solid.Data.DataObjects;
using GenerativeObjects.Practices.ORMSupportClasses;
using System.Security.Claims;

namespace Solid.BusinessLayer.Components.Server
{
    /// <summary>
    /// SecurityProvider Component
    ///  
    /// </summary>
    public partial interface ISecurityProvider
    {
        ClaimsPrincipal ValidateToken(string tokenString);
    }
}

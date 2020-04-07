
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using System.Web;

namespace Solid.Application.Web.Views
{
    public partial class Application : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
		    Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.MinValue);
			Response.CacheControl = "private";
            Response.Cache.SetNoStore();
        }

        public void OnLoggingOut(Object sender, System.EventArgs e)
        {
			Response.Clear();
			FormsAuthentication.SignOut();
            Session.Abandon();
			Response.Redirect(Request.Url.AbsoluteUri);
            FormsAuthentication.RedirectToLoginPage();
        }

    }
}

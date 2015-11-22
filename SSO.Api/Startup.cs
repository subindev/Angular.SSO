using Microsoft.Owin;
using Owin;
using System.IdentityModel.Tokens;
using IdentityServer3.AccessTokenValidation;

[assembly: OwinStartup(typeof(SSO.Api.Startup))]

namespace SSO.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            JwtSecurityTokenHandler.InboundClaimTypeMap.Clear();

            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
                {
                    Authority = "https://localhost:44333/",
                    RequiredScopes = new[] { "write" },

                    // client credentials for the introspection endpoint
                    ClientId = "write",
                    ClientSecret = "secret"
                });

            app.UseWebApi(WebApiConfig.Register());
        }
    }
}
//using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
//using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
//using System.Text;

namespace SkillsetClient
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public static IConfiguration Configuration { get; private set; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddAuthentication(sharedOptions =>
      {
        sharedOptions.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
        sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        sharedOptions.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
      })
       .AddOpenIdConnect(options =>
       {
         options.Authority = "https://login.microsoftonline.com/mfc.onmicrosoft.com";
         options.ClientId = "51ef9e59-683b-49bc-96c6-4ec76609f88d";
         options.ResponseType = OpenIdConnectResponseType.IdToken;
         options.CallbackPath = "/signin-oidc";
         //options.CallbackPath = "/.auth/login/aad/callback";
       })
       .AddCookie();

      //var a = Configuration["IDPServer:IssuerSigningKey"];
      //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      //.AddJwtBearer(options =>
      //{
      //    options.TokenValidationParameters = new TokenValidationParameters
      //    {
      //        ValidateIssuer = true,
      //        ValidateAudience = true,
      //        ValidateLifetime = true,
      //        ValidateIssuerSigningKey = true,
      //        ValidIssuer = Configuration["IDPServer:ValidIssuer"],
      //        ValidAudience = Configuration["IDPServer:ValidAudience"],
      //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["IDPServer:IssuerSigningKey"])),

      //    };
      //});

      //services.AddSingleton<Microsoft.AspNetCore.Http.IHttpContextAccessor, Microsoft.AspNetCore.Http.HttpContextAccessor>();
      //this will make JSON as statement case
      services.AddMvc()
              .AddJsonOptions(o =>
              {
                if (o.SerializerSettings.ContractResolver != null)
                {
                  var castedResolver = o.SerializerSettings.ContractResolver
                                as DefaultContractResolver;
                  castedResolver.NamingStrategy = null;
                }
              });
      services.AddCors(options =>
      {

        options.AddPolicy("CORS",

        corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin()

        // Apply CORS policy for any type of origin

        .AllowAnyMethod()

        // Apply CORS policy for any type of http methods

        .AllowAnyHeader()

        // Apply CORS policy for any headers

        .AllowCredentials());

        // Apply CORS policy for all users

      });

      services.AddSession();


    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseAuthentication();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseBrowserLink();
      }
      else
      {
        //app.UseExceptionHandler("/Home/Error");
      }

      app.UseStaticFiles();

      app.UseSession();

      app.UseCors("CORS");
      //app.UseMvc();
      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "default",
                  template: "{controller=Home}/{action=Index}/{id?}");
      });
    }
  }

}


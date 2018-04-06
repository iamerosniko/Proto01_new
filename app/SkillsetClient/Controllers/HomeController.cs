using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SkillsetClient.Models;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Text;

namespace SkillsetClient.Controllers
{
    public class HomeController : Controller
    {
        private string _authToken;
        private string _apiToken;
        private HttpClient _client;
        private TokenFactory _tokenFactory;

        public HomeController()
        {
            _tokenFactory = new TokenFactory();
            _client = new HttpClient();
        }

        public IActionResult Index()
        {
            if (HttpContext.User.Identity.Name == "" || HttpContext.User.Identity.Name == null)
            {
                return Redirect("~/Auth/SignIn");
            }
            //_authToken = HttpContext.Session.GetString("authToken");
            //var a = HttpContext.Session.Get("authToken");
            //if (_authToken == null)
            //{
            //    //get token for authentication
            //    //change route to signIn
            //    //this will create a token that can communicate to web api
            //    //save to session
            //    return Redirect("Home/SignIn");
            //}
            return View();
        }
        public IActionResult SignIn()
        {
            //request a post to IDP server to gain an AuthToken
            getAuthentication();
            ProvideAuthorization();
            ViewData["homepage"] = Startup.Configuration["ClientServer:Url"];
            return View();
        }

        public IActionResult getAuthentication()
        {
            //var a = Startup.Configuration["IDPServer:TokenRequestURL"];
            //var idpToken = await _client.PostAsync("http://localhost:60818/api/auth/token", null);
            //var idpToken = await _client.PostAsync(Startup.Configuration["IDPServer:TokenRequestURL"], null);
            //if (idpToken.IsSuccessStatusCode)
            //{
            //Storing the response details recieved from web api   
            //var authToken = JsonConvert.DeserializeObject<AppToken>(idpToken.Content.ReadAsStringAsync().Result);
            //HttpContext.Session.SetString("authToken", authToken.Token.ToString());
            //}
            var currentUserController = new CurrentUsersController();
            var currentUser = currentUserController.Get();

            //create a token and save to session ('authToken');
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Startup.Configuration["IDPServer:IssuerSigningKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
               claims: currentUserController.getCurrentClaims(currentUser),
               signingCredentials: creds
            );


            var myToken = new JwtSecurityTokenHandler().WriteToken(token);

            HttpContext.Session.SetString("authToken", myToken);


            System.Diagnostics.Debug.WriteLine(HttpContext.Session.GetString("authToken"));

            return Ok();
        }

        //this method generates its authorization token that will consumed by web api server only
        public void ProvideAuthorization()
        {
            //this is used to gather information about the client's identity
            var authenticationToken = HttpContext.Session.GetString("authToken");

            if (authenticationToken != null)
            {
                //1)Extracttoken is used to extract all details required before generating an authorization token
                //2)GenerateAuthorizationToken is used to generate Authorization token
                var authorizationToken = _tokenFactory.GenerateAuthorizationToken(_tokenFactory.ExtractToken(authenticationToken));

                //save to session   
                HttpContext.Session.SetString("apiToken", authorizationToken);
            }
        }

        #region "FrontEnd Communication"

        //this method will consumed by an angular application
        //this tokens will be saved either in sessionstorage or localstorage
        [Produces("application/json")]
        [Route("api/myToken")]
        public string GetToken()
        {
            SignIn();

            _authToken = HttpContext.Session.GetString("authToken");
            _apiToken = HttpContext.Session.GetString("apiToken");

            List<AppToken> appTokens = new List<AppToken>();
            appTokens.Add(new AppToken { Token = _authToken, TokenName = "AuthToken" });
            appTokens.Add(new AppToken { Token = _apiToken, TokenName = "ApiToken" });

            return JsonConvert.SerializeObject(appTokens);
        }

        #endregion


        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

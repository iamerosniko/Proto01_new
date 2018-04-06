using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        // GET api/values
        public Currentuser Get()
        {
            return new Currentuser
            {
                UserID = 1,
                UserName = HttpContext.Current.User.Identity.Name
            };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return HttpContext.Current.User.Identity.Name;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}

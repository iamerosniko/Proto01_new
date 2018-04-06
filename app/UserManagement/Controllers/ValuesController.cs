using System.Web;
using System.Web.Http;

namespace UserManagement.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        [AllowAnonymous]
        public string Get()
        {
            return HttpContext.Current.User.Identity.Name;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
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

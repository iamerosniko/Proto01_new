using Microsoft.AspNetCore.Mvc;

namespace SkillsetClient.Controllers.FrontEnd
{
  [Produces("application/json")]
  [Route("api/BTAM")]
  public class BTAMController : Controller
  {
    [HttpGet]
    public BTAMEntity Get()
    {
      return new BTAMEntity { BTAMURL = Startup.Configuration["BTAMURL"] };
    }
  }

  public class BTAMEntity
  {
    public string BTAMURL { get; set; }
  }
}

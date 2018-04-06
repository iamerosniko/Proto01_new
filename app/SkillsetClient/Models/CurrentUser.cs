using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetClient.Models
{
    public class CurrentUser
    {
        public string UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }

        public CurrentUser()
        {
            UserID = "";
            FirstName = "";
            LastName = "";
            Role = "";
        }
    }
}

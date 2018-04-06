using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetClient.Models
{
    public class SetUserAccess
    {
        public int user_grp_id { get; set; }
        public string user_id { get; set; }
        public string grp_id { get; set; }
    }
}

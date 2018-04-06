using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetClient.Models
{
    public class SetModule
    {
        public string mod_id { get; set; }
        public string mod_name { get; set; }
        public string mod_desc { get; set; }
        public DateTime created_date { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetClient.Models
{
    public class SetUser
    {
        public string user_id { get; set; }
        public string user_name { get; set; }
        public string user_last_name { get; set; }
        public string user_first_name { get; set; }
        public string user_middle_name { get; set; }
        public bool can_PROD { get; set; }
        public bool can_UAT { get; set; }
        public bool can_PEER { get; set; }
        public bool can_DEV { get; set; }
        public DateTime created_date { get; set; }
    }
}

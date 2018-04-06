using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetClient.Models
{
    public class SetGroupAccess
    {
        public int grp_mod_id { get; set; }
        public string grp_id { get; set; }
        public string mod_id { get; set; }
        public bool can_view { get; set; }
        public bool can_add { get; set; }
        public bool can_edit { get; set; }
        public bool can_delete { get; set; }
    }
}

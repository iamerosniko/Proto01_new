using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Entities
{
    [Table("set_user")]
    public class SetUser
    {
        [Key]
        [MaxLength(25)]
        public string user_id { get; set; }

        [MaxLength(25)]
        public string user_name { get; set; }

        [MaxLength(50)]
        public string user_last_name { get; set; }

        [MaxLength(50)]
        public string user_first_name { get; set; }

        [MaxLength(50)]
        public string user_middle_name { get; set; }

        public bool can_PROD { get; set; }

        public bool can_UAT { get; set; }

        public bool can_PEER { get; set; }

        public bool can_DEV { get; set; }

        public DateTime created_date { get; set; }
    }
}

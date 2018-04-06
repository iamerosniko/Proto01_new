using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Entities
{
    [Table("set_module")]
    public class SetModule
    {
        [Key]
        [MaxLength(25)]
        public string mod_id { get; set; }

        [MaxLength(50)]
        public string mod_name { get; set; }

        [MaxLength(255)]
        public string mod_desc { get; set; }

        public DateTime created_date { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Entities
{
    [Table("set_user_access")]
    public class SetUserAccess
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int user_grp_id { get; set; } 

        [MaxLength(25)]
        public string user_id { get; set; }

        [MaxLength(25)]
        public string grp_id { get; set; }
    }
}

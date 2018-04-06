using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Entities
{
    [Table("SS_AssociateDepartmentSkillsets")]
    public class AssociateDepartmentSkillset
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AssociateDepartmentSkillsetID { get; set; }

        [Required]
        public int AssociateID { get; set; }

        [Required]
        public int DepartmentSkillsetID { get; set; }

        [Required]
        [MaxLength(30)]
        public string LastWorkedOn { get; set; }
    }
}

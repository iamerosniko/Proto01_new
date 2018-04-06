using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Models
{
    public class AssociateDepartmentSkillsetForCreateDTO
    {
        [Required]
        public int AssociateID { get; set; }

        [Required]
        public int DepartmentSkillsetID { get; set; }

        [Required]
        [MaxLength(30)]
        public string LastWorkedOn { get; set; }
    }
}

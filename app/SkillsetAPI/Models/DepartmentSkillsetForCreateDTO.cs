using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Models
{
    public class DepartmentSkillsetForCreateDTO
    {
        [Required]
        public int DepartmentID { get; set; }

        [Required]
        public int SkillsetID { get; set; }
    }
}

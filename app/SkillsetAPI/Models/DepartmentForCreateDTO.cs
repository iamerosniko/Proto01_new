using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Models
{
    public class DepartmentForCreateDTO
    {
        [Required(ErrorMessage = "No DepartmentDescr")]
        [MaxLength(30)]
        public string DepartmentDescr { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Models
{
    public class LocationForCreateDTO
    {
        [Required(ErrorMessage = "No DepartmentDescr")]
        [MaxLength(30)]
        public string LocationDescr { get; set; }
    }
}

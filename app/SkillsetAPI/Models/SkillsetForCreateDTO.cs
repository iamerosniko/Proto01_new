using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Models
{
    public class SkillsetForCreateDTO
    {
        [Required]
        [MaxLength(50)]
        public string SkillsetDescr { get; set; }
    }
}

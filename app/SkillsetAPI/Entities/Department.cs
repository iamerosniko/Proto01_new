using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Entities
{
    [Table("SS_Departments")]
    public class Department
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DepartmentID { get; set; }

        [Required]
        [MaxLength(30)]
        public string DepartmentDescr { get; set; }

        public bool IsActive { get; set; }
    }
}

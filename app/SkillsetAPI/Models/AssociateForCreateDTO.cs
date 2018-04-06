using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Models
{
    public class AssociateForCreateDTO
    {
        [Required(ErrorMessage = "No FullName")]
        [MaxLength(100)]
        public string FullName { get; set; }

        [Required(ErrorMessage = "No UserID")]
        [MaxLength(25)]
        public string UserID { get; set; }

        [Required(ErrorMessage = "No Phonenumber")]
        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "No VPN")]
        public bool VPN { get; set; }

        [Required(ErrorMessage = "No DepartmentID")]
        public int DepartmentID { get; set; }

        [Required(ErrorMessage = "No LocationID")]
        public int LocationID { get; set; }
    }
}

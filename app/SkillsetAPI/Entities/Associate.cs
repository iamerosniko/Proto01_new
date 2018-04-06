using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Entities
{
    [Table("SS_Associates")]
    public class Associate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AssociateID { get; set; }

        [MaxLength(100)]
        public string FullName { get; set; }

        [MaxLength(25)]
        public string UserID { get; set; }

        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        public bool VPN { get; set; }

        public int DepartmentID { get; set; }

        public int LocationID { get; set; }

        public DateTime UpdatedOn { get; set; }

        public bool IsActive { get; set; }
    }
}

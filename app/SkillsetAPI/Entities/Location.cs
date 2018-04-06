using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Entities
{
    [Table("SS_Locations")]
    public class Location
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LocationID { get; set; }

        [Required]
        [MaxLength(30)]
        public string LocationDescr { get; set; }

        public bool IsActive { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillsetAPI.Entities
{
  [Table("SS_Locations")]
  public class Location
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int LocationID { get; set; }

    [Required]
    [MaxLength(100)]
    public string LocationDescr { get; set; }

    public bool IsActive { get; set; }
  }
}

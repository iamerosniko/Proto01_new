using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillsetAPI.Entities
{
  [Table("SS_Skillsets")]
  public class Skillset
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int SkillsetID { get; set; }

    [Required]
    [MaxLength(100)]
    public string SkillsetDescr { get; set; }

    public bool IsActive { get; set; }
  }
}

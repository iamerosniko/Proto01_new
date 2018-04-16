using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillsetAPI.Entities
{
  [Table("SS_DepartmentSkillsets")]
  public class DepartmentSkillset
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int DepartmentSkillsetID { get; set; }

    [Required]
    public int DepartmentID { get; set; }

    [Required]
    public int SkillsetID { get; set; }
  }
}

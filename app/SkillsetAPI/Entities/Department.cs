using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillsetAPI.Entities
{
  [Table("SS_Departments")]
  public class Department
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int DepartmentID { get; set; }

    [Required]
    [MaxLength(100)]
    public string DepartmentDescr { get; set; }

    public bool IsActive { get; set; }
  }
}

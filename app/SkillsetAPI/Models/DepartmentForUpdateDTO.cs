using System.ComponentModel.DataAnnotations;

namespace SkillsetAPI.Models
{
  public class DepartmentForUpdateDTO
  {
    [Required(ErrorMessage = "No DepartmentDescr")]
    [MaxLength(100)]
    public string DepartmentDescr { get; set; }

    [Required(ErrorMessage = "No IsActive")]
    public bool IsActive { get; set; }

  }
}

using System.ComponentModel.DataAnnotations;

namespace SkillsetAPI.Models
{
  public class DepartmentForCreateDTO
  {
    [Required(ErrorMessage = "No DepartmentDescr")]
    [MaxLength(100)]
    public string DepartmentDescr { get; set; }
  }
}

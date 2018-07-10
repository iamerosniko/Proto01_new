using System.ComponentModel.DataAnnotations;

namespace SkillsetAPI.Models
{
  public class LocationForCreateDTO
  {
    [Required(ErrorMessage = "No DepartmentDescr")]
    [MaxLength(100)]
    public string LocationDescr { get; set; }
  }
}

using System.ComponentModel.DataAnnotations;

namespace SkillsetAPI.Models
{
  public class SkillsetForCreateDTO
  {
    [Required]
    [MaxLength(100)]
    public string SkillsetDescr { get; set; }
  }
}

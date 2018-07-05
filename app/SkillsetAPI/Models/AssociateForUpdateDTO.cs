using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsetAPI.Models
{
  public class AssociateForUpdateDTO
  {
    [Required(ErrorMessage = "No UserID")]
    [MaxLength(25)]
    public string UserID { get; set; }

    [Required(ErrorMessage = "No Phonenumber")]
    [MaxLength(20)]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "No VPN")]
    public bool VPN { get; set; }

    [Required(ErrorMessage = "No DepartmentID")]
    public int DepartmentID { get; set; }

    [Required(ErrorMessage = "No LocationID")]
    public int LocationID { get; set; }

    [Required(ErrorMessage = "No IsActive")]
    public bool IsActive { get; set; }

    public DateTime UpdatedOn { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime TransferDate { get; set; }

  }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace SkillsetAPI.Models
{
  public class AssociateForUpdateDTO
  {
    public int AssociateID { get; set; }

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

    public Nullable<DateTime> StartDate { get; set; }
    public Nullable<DateTime> TransferDate { get; set; }

  }
}

using System;

namespace SkillsetClient.Models
{
    public class SS_Associates
    {
        public int AssociateID { get; set; }
        public string FullName { get; set; }
        public string UserID { get; set; }
        public string PhoneNumber { get; set; }
        public bool VPN { get; set; }
        public short DepartmentID { get; set; }
        public int LocationID { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsActive { get; set; }
    }
}

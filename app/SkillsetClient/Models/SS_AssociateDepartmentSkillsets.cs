namespace SkillsetClient.Models
{
    public class SS_AssociateDepartmentSkillsets
    {
        public int AssociateDepartmentSkillsetID { get; set; }
        public int AssociateID { get; set; }
        public int DepartmentSkillsetID { get; set; }
        public string LastWorkedOn { get; set; }
    }
}

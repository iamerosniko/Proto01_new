
/*AssociateViews*/
export class AssociateDepartmentSkillset {
    constructor (
            public AssociateDepartmentSkillsetID?: number,//primary key
            public AssociateID?: number,
            public DepartmentSkillsetID?: number,
            public LastWorkedOn?:string){
        this.AssociateDepartmentSkillsetID = 0,
        this.AssociateID = 0,
        this.DepartmentSkillsetID = 0,
        this.LastWorkedOn=null;
    }
}

/*AssociateViews*/
export class DepartmentSkillsets {
    constructor (
            public DepartmentSkillsetID?: number,//primary key
            public DepartmentID?: number,
            public SkillsetID?: number){
        this.DepartmentSkillsetID = 0,
        this.DepartmentID = 0,
        this.SkillsetID = 0
    }
}

export class Associate {
    constructor (
            public AssociateID?: number,
            public DepartmentID? : number,
            public IsActive? : Boolean,
            public LocationID? : number,
            public PhoneNumber? : string,
            public UpdatedOn? : Date,
            public UserID ?:string,
            public VPN? : Boolean,
            public FullName ?: string){
        this.AssociateID = 0,
        this.PhoneNumber = '',
        this.VPN = false,
        this.DepartmentID = 0,
        this.LocationID = 0,
        this.UpdatedOn = new Date(new Date().setHours(-3)),
        this.IsActive = true,
        this.UserID='',
        this.FullName=''

    }
}

export class Department {
    constructor (
        public DepartmentID: number,//primary key
        public DepartmentDescr: string,
        public IsActive : Boolean,
    ){}
}

export class Skillset {
    constructor (
        public SkillsetID: number,//primary key
        public SkillsetDescr: string,
        public IsActive : Boolean,
    ){}
}

export class Location {
    constructor (
        public LocationID: number,//primary key
        public LocationDescr: string,
        public IsActive : Boolean,
    ){}
}

/*BTSS*/
export class Set_Module {
    constructor (
        public mod_id: string,//primary key
        public mod_name: string,
        public mod_desc : string,
        public created_date : Date
    ){}
}

export class Set_Group {
    constructor (
        public grp_id: string,//primary key
        public grp_name: string,
        public grp_desc : string,
        public created_date : Date
    ){}
}

export class Set_User {
    constructor (
        public user_id: string,//primary key
        public user_name: string,
        public user_last_name: string,
        public user_first_name: string,
        public user_middle_name: string,
        public can_PROD: Boolean,
        public can_UAT: Boolean,
        public can_PEER: Boolean,
        public can_DEV: Boolean,
        public created_date : Date
    ){}
}

export class Set_User_Access {
    constructor (
        public id:number,
        public user_id: string,
        public grp_id:string
    ){}
}

export class User {
    constructor (
        public UserID : string,
        public UserName: string,
        public FirstName :string,
        public LastName: string,
        public Role:string,
    ){}
}
/*AssociateViews*/
export class DepartmentSkillsets1 {
    constructor (
            public DepartmentSkillsetID?: number,//primary key
            public DepartmentID?: number,
            public SkillsetID?: number){
    }
}
//extra entity
export class SelectedSkillset{
    constructor (
       public departmentSkillset: DepartmentSkillsets1,
       public IsSelected:boolean,
       public SkillsetDescr:string
    ){}
}

export class ng2Items{
    constructor (
        public text: string,
        public id: string
    ){}
}

export class AssociateDetails{
    constructor(
        public Name? : string,
        public VPN? : string,
        public Phone?: string,
        public Department? : string,
        public Location? : string,
        public UpdatedOn? : string,
        public assocId?: number
    ){}
}

/* reports - eros - */
export class AssociateRpt {
    constructor (
        // public Name?: string,
        // public PhoneNumber?: string,
        // public CurrentDepartment?: string,
        // public CurrentLocation?: string,
        // public VPN?: string,
        // public LastUpdated?: string,
        public Associate:AssociateDetails,
        public DepartmentSkills?:DepartmentSkills[]
        ){
    }
}

export class SkillsetRpt {
    constructor (
        public Skillset: string,
        public Associates:AssociateDetails[]
        ){
    }
}

export class DepartmentRpt{
    constructor(
        public Department?:string,
        public AssociateRpts?:AssociateRpt[]
    ){

    }
}

export class DepartmentSkills{
    constructor (
        public Skills: Skillset[],
        public DepartmentName: string
    ){}
}


//last time worked on report
export class LastTimeWorkedOnRpt{
    constructor(
        
        public lastWorkOnItem:string,
        public skillsetRpt:SkillsetRpt[]
    ){
    }
}

// SelectItem
export class SelectItem{
    constructor (
        public id: number,
        public text: string
    ){}
}

export class DepartmentSkillsetDTO{
    constructor(
        public department:string,
        public skillset:string
    ){}
}

export class MyToken{
    constructor(
        public Token:string,
        public TokenName:string
    ){

    }    
}

export class SignedInUser{
    constructor(
        public UserName : string, 
        public FirstName :string,
        public LastName: string,
        public Role:string,
    ){}
}
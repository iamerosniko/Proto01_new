/*AssociateViews*/
export class DepartmentSkillsetDBO {
    constructor (
            public DepartmentSkillsetID?: number,//primary key
            public DepartmentID?: number,
            public DepartmentDescr?: string,
            public SkillsetID?: number,
            public SkillsetDescr?: string,
            public IsSelected?: boolean,
            public DepartmentIsActive?: Boolean,
            public SkillsetIsActive?: Boolean,
            public LastWorkedOn?:string,
            public tempLastWorkedOn?:number ){
        this.DepartmentSkillsetID = 0,
        this.DepartmentID = 0,
        this.DepartmentDescr = '',
        this.SkillsetID = 0,
        this.SkillsetDescr ='',
        this.IsSelected = false,
        this.DepartmentIsActive = false,
        this.SkillsetIsActive = false,
        this.LastWorkedOn=null,
        
        this.tempLastWorkedOn=0;
    }
}
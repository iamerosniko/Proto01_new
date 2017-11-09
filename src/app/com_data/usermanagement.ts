import { User } from '../com_entities/entities';
import { CurrentUserSvc } from '../com_services/currentuser.svc';

export class UserManagement{
  constructor(private cuSvc : CurrentUserSvc){

  }
  async getUsers():Promise<string>{
    var user = await this.cuSvc.getCurrentUser();
    return user.UserName;
  }
}

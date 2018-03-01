export class ClientApiSettings {
    private static CURRENTCONTROLLER_URL = "http://localhost:54624/"
    private static CURRENTAPI_URL = "http://localhost:54624/api/"
    private static WEBAPI_URL = "http://b04webd04:8063/api/"

    public static GETAPIURL(controller:string):string{
        return this.WEBAPI_URL+controller;
    }

    public static GETCLIENTAPIURL(controller:string):string{
        return this.CURRENTAPI_URL+controller;
    }

    public static GETCLIENTCONTROLLERURL(controller:string):string{
        return this.CURRENTCONTROLLER_URL+controller;
    }

    public static HANDLEERROR(error : any):Promise<any>{
        console.error('An error occured',error);
        return Promise.reject(error.message || error);
    }
}
export class AppSettings {
    // public static CURRENT_URL = "http://localhost:60812/api/"; 
    public static CURRENT_URL = "https://skillsetclient.azurewebsites.net/api/"; 
    // public static CURRENT_URL = "api/"; 
    // public static BTAM_URL = "http://localhost:49475/api/SingleSignIn/"
    public static BTAM_URL = "https://btaccessmanagementbw-dev.azurewebsites.net/api/SingleSignIn/"
    public static HANDLEERROR(error: any): Promise<any> {
        // console.error('An error occurred', error); // for demo purposes only
        // window.location.reload(true);
        return Promise.reject(error.message || error);
    }
}
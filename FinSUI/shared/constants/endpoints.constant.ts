import { environment } from "src/environments/environment"

export const API_ENDPOINT = {
    login: {
        URI: 'login/authenticate'
    }
}

// http://3.138.195.191:8080/fs/user

export class GetApiEndPoints {
    public static login = {
        getUrl: () => `${environment.baseURI}${API_ENDPOINT.login.URI}`
    }
}
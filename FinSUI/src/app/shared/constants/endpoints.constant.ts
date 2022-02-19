import { environment } from "src/environments/environment"

export const API_ENDPOINT = {
    login: {
        URI: 'login/authenticate'
    },
    firm: {
        getFirm: 'firm'
    },
    designation: {
        getDesignation: 'designation'
    },
    expense: {
        getDesignation: 'expenseType'
    }
}

// http://3.138.195.191:8080/fs/user

export class GetApiEndPoints {
    public static login = {
        getUrl: () => `${environment.baseURI}${API_ENDPOINT.login.URI}`
    }
    public static getFirm = {
        getUrl: () => `${environment.baseURI}${API_ENDPOINT.firm.getFirm}`
    }
    public static getDesignation = {
        getUrl: () => `${environment.baseURI}${API_ENDPOINT.designation.getDesignation}`
    }
    public static getExpense = {
        getUrl: () => `${environment.baseURI}${API_ENDPOINT.expense.getDesignation}`
    }
}
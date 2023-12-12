import {IBranchView} from "../models/IBranchView";
import axios from 'axios';

export class BranchService {
    private static serverUrl: string = `https://sfpl-assets.onrender.com`;

    /**
     @usage : to get all contacts
     @method : GET
     @params : no-params
     @url : http://localhost:9000/contacts
     */
    public static getAllBranches(): Promise<{ data: IBranchView[] }> {
        let dataUrl: string = `${this.serverUrl}/branches/`;
        return axios.get(dataUrl);
    }

    /**
     @usage : get a contact
     @method : GET
     @params : no-params
     @url : http://localhost:9000/contacts/:contactId
     */
    public static getBranch(Person_Contact: string): Promise<{ data: IBranchView }> {
        let dataUrl: string = `${this.serverUrl}/branches/${Person_Contact}`;
        return axios.get(dataUrl);
    }

    /**
     @usage : create a contact
     @method : POST
     @params : name, imageUrl, email, mobile, company, title, groupId
     @url : http://localhost:9000/contacts/
     */
    public static createBranch(branch: IBranchView): Promise<{ data: IBranchView }> {
        let dataUrl: string = `${this.serverUrl}/branches/`;
        return axios.post(dataUrl, branch);
    }

    /**
     @usage : Update a contact
     @method : PUT
     @params : name, imageUrl, email, mobile, company, title, groupId
     @url : http://localhost:9000/contacts/:contactId
     */
    public static updateBranch(branch: IBranchView, Person_Contact: string): Promise<{ data: IBranchView }> {
        let dataUrl: string = `${this.serverUrl}/branches/${Person_Contact}`;
        return axios.put(dataUrl, branch);
    }


}
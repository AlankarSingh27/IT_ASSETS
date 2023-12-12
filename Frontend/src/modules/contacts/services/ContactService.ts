import {IContactView} from "../models/IContactView";
import axios from 'axios';

export class ContactService {
    private static serverUrl: string = `https://sfpl-assets.onrender.com`;

    /**
     @usage : to get all contacts
     @method : GET
     @params : no-params
     @url : http://localhost:9000/contacts
     */
    public static getAllContacts(): Promise<{ data: IContactView[] }> {
        let dataUrl: string = `${this.serverUrl}/headOffice/`;
        return axios.get(dataUrl);
    }

    /**
     @usage : get a contact
     @method : GET
     @params : no-params
     @url : http://localhost:9000/contacts/:contactId
     */
    public static getContact(Employee_Id: string): Promise<{ data: IContactView }> {
        let dataUrl: string = `${this.serverUrl}/headOffice/${Employee_Id}`;
        return axios.get(dataUrl);
    }

    /**
     @usage : create a contact
     @method : POST
     @params : name, imageUrl, email, mobile, company, title, groupId
     @url : http://localhost:9000/contacts/
     */
    public static createContact(contact: IContactView): Promise<{ data: IContactView }> {
        let dataUrl: string = `${this.serverUrl}/headOffice/`;
        return axios.post(dataUrl, contact);
    }

    /**
     @usage : Update a contact
     @method : PUT
     @params : name, imageUrl, email, mobile, company, title, groupId
     @url : http://localhost:9000/contacts/:contactId
     */
    public static updateContact(contact: IContactView, Employee_Id: string): Promise<{ data: IContactView }> {
        let dataUrl: string = `${this.serverUrl}/headOffice/${Employee_Id}`;
        return axios.put(dataUrl, contact);
    }


}
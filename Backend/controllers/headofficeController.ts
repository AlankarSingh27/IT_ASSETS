import {Request, Response} from 'express';
import {APP_STATUS} from "../constants/constants";
import {validationResult} from "express-validator";
import HeadOfficeTable from "../database/ContactSchema";
import {IContact} from "../model/IContact";
import mongoose from "mongoose";


/**
 @usage : to get all contacts
 @method : GET
 @params : no-params
 @url : http://localhost:9000/contacts
 */
export const getAllContacts = async (request: Request, response: Response) => {
    try {
        let contacts: IContact[] | undefined = await HeadOfficeTable.find(); // select * from contacts;
        if (contacts) {
            return response.status(200).json(contacts);
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}

/**
 @usage : get a contact
 @method : GET
 @params : no-params
 @url : http://localhost:9000/contacts/:contactId
 */
export const getContact = async (request: Request, response: Response) => {
    
      
        try {
            let {contactId} = request.params;
            if (contactId) {
                const mongoContactId = new mongoose.Types.ObjectId(contactId); 
                const contact: IContact | undefined | null = await HeadOfficeTable.findById(mongoContactId);
                if (!contact) {
                    return response.status(404).json({
                        status: APP_STATUS.FAILED,
                        data: null,
                        error: "No Contact found"
                    });
                }
                return response.status(200).json(contact);
            }
        } catch (error: any) {
            return response.status(500).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: error.message
            });
        }
    
}

/**
 @usage : create a contact
 @method : POST
 @params : name, imageUrl, mobile, address,loan_Amount,disb_Date,intrest_Rate,process_Fee,gst,arranger,total_Tenor,moratorioum,other
 @url : http://localhost:9000/contacts/
 */
export const createContact = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }
    try {
        // read the form data
        let {Employee_Name, Employee_Id, Department, Email_Id,Contact_No, Laptop, Serial_No, HandoverDate,Status,Remarks} = request.body;

        // check if the mobile exists
        let contact = await HeadOfficeTable.findOne({Contact_No: Contact_No});
        if (contact) {
            return response.status(400).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Mobile number is already exists"
            });
        }
        // create
        let theContactObj: IContact = {
            Employee_Name:Employee_Name,
             Employee_Id:Employee_Id, 
             Department:Department, 
             Email_Id:Email_Id,
             Contact_No:Contact_No, 
             Laptop:Laptop,
              Serial_No:Serial_No, 
              HandoverDate:HandoverDate,
              Status:Status,
              Remarks:Remarks
        }
        theContactObj = await new HeadOfficeTable(theContactObj).save();
        console.log(theContactObj);
        if (theContactObj) {
            return response.status(200).json(theContactObj);
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}

/**
 @usage : Update a contact
 @method : PUT
 @params :name, imageUrl, mobile, address,loan_Amount,disb_Date,intrest_Rate,process_Fee,gst,arranger,total_Tenor,moratorioum
 @url : http://localhost:9000/contacts/:contactId
 */
export const updateContact = async (request: Request, response: Response) => {
    const {contactId} = request.params;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }
    try {
       
        // read the form data
        let {Employee_Name, Employee_Id, Department, Email_Id,Contact_No, Laptop, Serial_No, HandoverDate,Status,Remarks} = request.body;

        // check if the contact exists
        const mongoContactId = new mongoose.Types.ObjectId(contactId);
        let contact: IContact | null | undefined = await HeadOfficeTable.findById(mongoContactId);
        if (!contact) {
            return response.status(404).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Contact is not found"
            });
        }
        // update
        let theContactObj: IContact | null = {
            Employee_Name:Employee_Name,
            Employee_Id:Employee_Id, 
            Department:Department, 
            Email_Id:Email_Id,
            Contact_No:Contact_No, 
            Laptop:Laptop,
             Serial_No:Serial_No, 
             HandoverDate:HandoverDate,
             Status:Status,
             Remarks:Remarks
        }
        theContactObj = await HeadOfficeTable.findByIdAndUpdate(mongoContactId, {
            $set: theContactObj
        }, {new: true})
        if (theContactObj) {
            return response.status(200).json(theContactObj);
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}


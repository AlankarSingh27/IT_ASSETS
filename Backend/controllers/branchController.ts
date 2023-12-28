import {Request, Response} from 'express';
import {APP_STATUS} from "../constants/constants";
import {validationResult} from "express-validator";
import BranchTable from "../database/BranchSchema";
import {IBranch} from "../model/IBranch";
import mongoose from "mongoose";


/**
 @usage : to get all contacts
 @method : GET
 @params : no-params
 @url : http://localhost:9000/contacts
 */
export const getAllBranches = async (request: Request, response: Response) => {
    try {
       
        let contacts: IBranch[] | undefined = await BranchTable.find(); // select * from contacts;
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
export const getABranch= async (request: Request, response: Response) => {
    try {
        let {contactId} = request.params;
        if (contactId) {
            const mongoContactId = new mongoose.Types.ObjectId(contactId); // string -> mongo id
            const contact: IBranch | undefined | null = await BranchTable.findById(mongoContactId);
            if (!contact) {
                return response.status(404).json({
                    status: APP_STATUS.FAILED,
                    data: null,
                    error: "No Branch found"
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
export const createBranch = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }
    try {
        // read the form data
        let {Branches,
            Branch_Code,
            Contact_Person,
            Person_Contact,
            Branch_Address,
            Laptop_Manufacture,
            Laptop_SerialNo,
            Printer_Manufacture,
            Printer_SerialNo,
            Status,
            HandoverDate,
            Remarks} = request.body;
            if (!('Branch_Code' in request.body)) {
                Branch_Code= ""; // Set to null or handle accordingly
            }
            if (!('Person_Contact' in request.body)) {
                Person_Contact= ""; // Set to null or handle accordingly
            }
            //
        // check if the mobile exists
        // let contact = await BranchTable.findOne({Person_Contact: Person_Contact});
        // if (contact) {
        //     return response.status(400).json({
        //         status: APP_STATUS.FAILED,
        //         data: null,
        //         error: "Mobile number is already exists"
        //     });
        // }
        // create
        let theContactObj: IBranch = {
            Branches:Branches,
            Branch_Code:Branch_Code,
            Contact_Person:Contact_Person,
            Person_Contact: Person_Contact,
            Branch_Address:Branch_Address,
            Laptop_Manufacture:Laptop_Manufacture,
            Laptop_SerialNo:Laptop_SerialNo,
            Printer_Manufacture:Printer_Manufacture,
            Printer_SerialNo:Printer_SerialNo,
            Status:Status,
            HandoverDate:HandoverDate,
            Remarks:Remarks
        }
        theContactObj = await new BranchTable(theContactObj).save();
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
export const updateBranch = async (request: Request, response: Response) => {
    const {contactId} = request.params;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }
    try {
       
        // read the form data
        let {Branches,
            Branch_Code,
            Contact_Person,
            Person_Contact,
            Branch_Address,
            Laptop_Manufacture,
            Laptop_SerialNo,
            Printer_Manufacture,
            Printer_SerialNo,
            Status,
            HandoverDate,
            Remarks} = request.body;
            if (!('Branch_Code' in request.body)) {
                Branch_Code= ""; // Set to null or handle accordingly
            }
            if (!('Person_Contact' in request.body)) {
                Person_Contact= ""; // Set to null or handle accordingly
            }
        // check if the contact exists
        const mongoContactId = new mongoose.Types.ObjectId(contactId);
        let contact: IBranch | null | undefined = await BranchTable.findById(mongoContactId);
        if (!contact) {
            return response.status(404).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Branch is not found"
            });
        }
        // update
        let theContactObj: IBranch | null = {
            Branches:Branches,
            Branch_Code:Branch_Code,
            Contact_Person:Contact_Person,
            Person_Contact: Person_Contact,
            Branch_Address:Branch_Address,
            Laptop_Manufacture:Laptop_Manufacture,
            Laptop_SerialNo:Laptop_SerialNo,
            Printer_Manufacture:Printer_Manufacture,
            Printer_SerialNo:Printer_SerialNo,
            Status:Status,
            HandoverDate:HandoverDate,
            Remarks:Remarks
        }
        theContactObj = await BranchTable.findByIdAndUpdate(mongoContactId, {
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



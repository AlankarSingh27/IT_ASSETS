import mongoose from "mongoose";
import {IContact} from "../model/IContact";

const HeadOfficeSchema = new mongoose.Schema<IContact>({
    Employee_Name: {type: String, required: true},
    Employee_Id: {type: String, required: true,unique:true},
    Department: {type: String, required: true},
    Email_Id: {type: String},
    Contact_No: {type: String, required: true,unique:true},
    Laptop: {type: String, required: true},
    Serial_No: {type: String, required: true},
    HandoverDate: {type: String, required: true},
    Status:{type: String, required: true},
    Remarks:{type: String, required: true}
}, {timestamps: true});

const HeadOfficeTable = mongoose.model<IContact>('headOffice', HeadOfficeSchema);
export default HeadOfficeTable;
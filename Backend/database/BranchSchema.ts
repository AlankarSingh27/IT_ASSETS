import mongoose from "mongoose";
import {IBranch} from "../model/IBranch";

const BranchSchema = new mongoose.Schema<IBranch>({
    Branches:{type: String, required: true},
    Branch_Code:{type:String},
    Contact_Person:{type: String, required: true},
    Person_Contact:{type: String},
    Branch_Address:{type: String, required: true},
    Laptop_Manufacture:{type: String, required: true},
    Laptop_SerialNo:{type: String, required: true},
    Printer_Manufacture:{type: String, required: true},
    Printer_SerialNo:{type: String, required: true},
    Status:{type: String, required: true},
    HandoverDate:{type: String, required: true},
    Remarks:{type: String, required: true},
}, {timestamps: true});

const BranchTable = mongoose.model<IBranch>('Branch', BranchSchema);
export default BranchTable;
// import mongoose from "mongoose";

// export class DBUtil {
//     public static connectToDB(dbUrl: string, dbName: string): Promise<string> {
//         return new Promise((resolve, reject) => {
//             mongoose.connect(dbUrl, {
//                 dbName: dbName,
//             }, (error) => {
//                 if (error) {
//                     reject("Connection MongoDB Failed!");
//                 } else {
//                     resolve("Connected to MongoDB Successfully!");
//                 }
//             })
//         })
//     }
// }
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IBranch } from '../model/IBranch';
export class DBUtil {
    public static connectToDB(dbUrl: string, dbName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            mongoose.connect(dbUrl, {
                dbName: dbName,
            }, async (error) => {
                if (error) {
                    reject("Connection to MongoDB Failed!");
                } else {
                    // Perform schema and document update here
                    try {
                        await this.addNewFieldToDocuments();
                        resolve("Connected to MongoDB Successfully!");
                    } catch (err) {
                        reject("Failed to add new field: " + err);
                    }
                }
            })
        })
    }

    private static async addNewFieldToDocuments(): Promise<void> {
        // Define the schema
        const BranchSchema = new mongoose.Schema({
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
        });

        // Access your existing model or create a new one if necessary
        const YourModel = mongoose.model('branches', BranchSchema);

        // Update existing documents to include the new field
        try {
            await YourModel.updateMany({}, { $set: { Branch_Code: "" } });
        } catch (err) {
            throw new Error("Failed to update documents: " + err);
        }
    }
}


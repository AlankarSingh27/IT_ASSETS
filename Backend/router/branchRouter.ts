import {Router, Request, Response} from 'express';
import {body} from "express-validator";
import * as branchController from "../controllers/branchController";
const branchRouter: Router = Router();

branchRouter.get("/",  async (request: Request, response: Response) => {
    await branchController.getAllBranches(request, response);
});



 branchRouter.get("/:contactId", async (request: Request, response: Response) => {
    await branchController.getABranch(request, response);
});


branchRouter.post("/", [
    body('Branches').not().isEmpty().withMessage("Branches Name is Required"),
    body('Contact_Person').not().isEmpty().withMessage("Contact Person Name is Required"),
    body('Person_Contact').not().isEmpty().withMessage("Person Contact is Required"),
    body('Branch_Address').not().isEmpty().withMessage("Branch Address is Required"),
    body('Laptop_Manufacture').not().isEmpty().withMessage("Laptop is Required"),
    body('Laptop_SerialNo').not().isEmpty().withMessage("Laptop Serial No is Required"),
    body('Printer_Manufacture').not().isEmpty().withMessage("Printer Manufacture is Required"),
    body('Printer_SerialNo').not().isEmpty().withMessage("Printer Serial No is Required"),
    body('Status').not().isEmpty().withMessage("Status is Required"),
    body('HandoverDate').not().isEmpty().withMessage(" Handover Date is Required"),
    body('Remarks').not().isEmpty().withMessage(" Status is Required"),
], async (request: Request, response: Response) => {
    await branchController.createBranch(request, response);
});
branchRouter.put("/:contactId", [
    body('Branches').not().isEmpty().withMessage("Branches Name is Required"),
    body('Contact_Person').not().isEmpty().withMessage("Contact Person Name is Required"),
    body('Person_Contact').not().isEmpty().withMessage("Person Contact is Required"),
    body('Branch_Address').not().isEmpty().withMessage("Branch Address is Required"),
    body('Laptop_Manufacture').not().isEmpty().withMessage("Laptop is Required"),
    body('Laptop_SerialNo').not().isEmpty().withMessage("Laptop Serial No is Required"),
    body('Printer_Manufacture').not().isEmpty().withMessage("Printer Manufacture is Required"),
    body('Printer_SerialNo').not().isEmpty().withMessage("Printer Serial No is Required"),
    body('Status').not().isEmpty().withMessage(" Status is Required"),
    body('HandoverDate').not().isEmpty().withMessage(" Handover Date is Required"),
    body('Remarks').not().isEmpty().withMessage(" Status is Required"),
], async (request: Request, response: Response) => {
    await branchController.updateBranch(request, response);
});
export default branchRouter;
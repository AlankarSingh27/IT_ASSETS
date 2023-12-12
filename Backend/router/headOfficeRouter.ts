import {Router, Request, Response} from 'express';
import * as branchController from '../controllers/headofficeController';
import {body} from 'express-validator';


const headOfficeRouter: Router = Router();
headOfficeRouter.get("/",  async (request: Request, response: Response) => {
    await branchController.getAllContacts(request, response);
});



 headOfficeRouter.get("/:contactId", async (request: Request, response: Response) => {
    await branchController.getContact(request, response);
});


headOfficeRouter.post("/", [
    body('Employee_Name').not().isEmpty().withMessage("Employee Name is Required"),
    body('Employee_Id').not().isEmpty().withMessage("Employee Id is Required"),
    body('Department').not().isEmpty().withMessage("Department is Required"),
    body('Email_Id').optional(),
    body('Contact_No').not().isEmpty().withMessage("Contact_No is Required"),
    body('Laptop').not().isEmpty().withMessage("Laptop is Required"),
    body('Serial_No').not().isEmpty().withMessage("Serial No is Required"),
    body('HandoverDate').not().isEmpty().withMessage("HandoverDate is Required"),
    body('Status').not().isEmpty().withMessage("Status is Required"),
    body('Remarks').not().isEmpty().withMessage("Remarks is Required")
], async (request: Request, response: Response) => {
    await branchController.createContact(request, response);
});

headOfficeRouter.put("/:contactId", [
    body('Employee_Name').not().isEmpty().withMessage("Employee Name is Required"),
    body('Employee_Id').not().isEmpty().withMessage("Employee Id is Required"),
    body('Department').not().isEmpty().withMessage("Department is Required"),
    body('Email_Id').optional(),
    body('Contact_No').not().isEmpty().withMessage("Contact_No is Required"),
    body('Laptop').not().isEmpty().withMessage("Laptop is Required"),
    body('Serial_No').not().isEmpty().withMessage("Serial No is Required"),
    body('HandoverDate').not().isEmpty().withMessage("HandoverDate is Required"),
    body('Status').not().isEmpty().withMessage("Status is Required"),
    body('Remarks').not().isEmpty().withMessage("Remarks is Required")
], async (request: Request, response: Response) => {
    await branchController.updateContact(request, response);
});
export default headOfficeRouter;
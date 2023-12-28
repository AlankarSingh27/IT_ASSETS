import React, {useEffect, useState} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IBranchView} from "../../models/IBranchView";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as branchActions from "../../../../redux/branches/branches.actions";
import * as branchReducer from "../../../../redux/branches/branches.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";

export const EditBranch: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const {contactId} = useParams();
    
    /**
     * get the data from redux
     */
    const branchState: branchReducer.BranchState = useSelector((store: RootState) => {
        return store[branchReducer.branchFeatureKey];
    })

    const {loading, branch: branchRedux, error} = branchState;
    const [contact, setContact] = useState<IBranchView>({
        Branches: "",
        Branch_Code:"",
        Contact_Person: "",
        Person_Contact: "",
        Branch_Address: "",
        Laptop_Manufacture: "",
        Laptop_SerialNo: "",
        Printer_Manufacture: "",
        Printer_SerialNo:"",
        Status:"",
        HandoverDate:"",
        Remarks:""
    });
    const [createContact, setCreateContact] = useState<IBranchView>({
        Branches: "",
        Contact_Person: "",
        Branch_Code:"",
        Person_Contact: "",
        Branch_Address: "",
        Laptop_Manufacture: "",
        Laptop_SerialNo: "",
        Printer_Manufacture: "",
        Printer_SerialNo:"",
        Status:"Active",
        HandoverDate:"",
        Remarks:""
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    /**
     * when contactId, then get the contact from server
     */
    useEffect(() => {
        if (contactId) {
            dispatch(branchActions.getBranchAction({contactId: contactId}));
        }
    }, [contactId]);

 

    // If contact data is available, populate the state
    useEffect(() => {
        if (branchRedux && Object.keys(branchRedux).length > 0) {
            const data :any= branchState.branch; // Assuming the data array is available in your response
            setContact({
                Branches: data.Branches || "",
                Contact_Person: data.Contact_Person || "",
                Branch_Code: data.Branch_Code || "",
                Person_Contact: data.Person_Contact || "",
                Branch_Address: data.Branch_Address || "",
                Laptop_Manufacture: data.Laptop_Manufacture || "",
                Laptop_SerialNo: data.Laptop_SerialNo || "",
                Printer_Manufacture: data.Printer_Manufacture || "",
                Printer_SerialNo: data.Printer_SerialNo|| "",
                Status: data.Status || "",
                HandoverDate: data.HandoverDate || "",
                Remarks: data.Remarks || "",
            });
        }
    }, [branchRedux]);
   
    /**
     * when the form field data changes, update the local state
     * @param event
     */
    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    };

    /**
     * form submit for update
     * @param event
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (contactId) {
            dispatch(branchActions.updateBranchAction({
                branch: contact,
                contactId: contactId
             })).then((response: any) => {
                if (!response.error) {
                    console.log("Branch updated successfully!");
                    // navigate("/contacts/branch");
                    setUpdateSuccess(true);
                } else {
                    console.log(response.error); // Handle the error appropriately
                }
            });
           
        }
    };
    const updateCreateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(event.target.value); // Add this line to log the value
        const value = event.target.type === 'select-one' ? event.target.value : event.target.value;
        setCreateContact({
            ...createContact,
            [event.target.name]: value
        });
    };
    const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Add new contact
        dispatch(branchActions.createBranchAction({ branch:createContact})).then((response: any) => {
            console.log(response);
            if (!response.error) {
                console.log("Branch created successfully!");
                navigate("/contacts/admin");
            } else {
                console.log(response.error);
            }
        });
    };

    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Edit Contact'} color={'text-primary'}/>
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)}/>}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Branches'}
                                        value={contact.Branches}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Name Branches" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Branch_Code'}
                                        value={contact.Branch_Code}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Branche Code" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Contact_Person'}
                                        value={contact.Contact_Person}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Contact_Person" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name={'Person_Contact'}
                                        value={contact.Person_Contact}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Person_Contact" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Branch_Address'}
                                        value={contact.Branch_Address}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Branch_Address" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Laptop_Manufacture'}
                                        value={contact.Laptop_Manufacture}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Laptop Manufacture" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Laptop_SerialNo'}
                                        value={contact.Laptop_SerialNo}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Laptop SerialNo" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Printer_Manufacture'}
                                        value={contact.Printer_Manufacture}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Printer_Manufacture" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Printer_SerialNo'}
                                        value={contact.Printer_SerialNo}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder=" Printer SerialNo" type="text"/>
                                </div>
                                <div className="mb-2">
                                <select
                                 required={true}
                                 name="Status"
                                 value={contact.Status}
                                 onChange={(e) => updateInput(e)}
                                className="form-select"
                                >
                               <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="Repairing">Repairing</option>
                    <option value="InStock">InStock</option>
                               </select>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'HandoverDate'}
                                        value={contact.HandoverDate}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="HandoverDate" type="date"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Remarks'}
                                        value={contact.Remarks}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Remarks" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input className="btn btn-success me-2" type="submit" value="Update"/>
                                    <Link className="btn btn-dark" to="/contacts/branch">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        {updateSuccess ? (
                        <div className="col-sm-4">
                            <form onSubmit={e =>  handleCreateSubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Branches'}
                                        value={createContact.Branches}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Name Branches" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Branch_Code'}
                                        value={createContact.Branch_Code}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Branches Code" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Contact_Person'}
                                        value={createContact.Contact_Person}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Contact Person" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name={'Person_Contact'}
                                        value={createContact.Person_Contact}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Person_Contact" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Branch_Address'}
                                        value={createContact.Branch_Address}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Branch_Address" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Laptop_Manufacture'}
                                        value={createContact.Laptop_Manufacture}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Laptop Manufacture" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Laptop_SerialNo'}
                                        value={createContact.Laptop_SerialNo}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Laptop SerialNo" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Printer_Manufacture'}
                                        value={createContact.Printer_Manufacture}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Printer_Manufacture" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Printer_SerialNo'}
                                        value={createContact.Printer_SerialNo}
                                        onChange={e =>updateCreateInput(e)}
                                        className="form-control" placeholder=" Printer SerialNo" type="text"/>
                                </div>
                                <div className="mb-2">
                                <select
                                 required={true}
                                 name="Status"
                                 value={contact.Status}
                                 onChange={(e) => updateInput(e)}
                                className="form-select"
                                >
                               <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="Repairing">Repairing</option>
                    <option value="InStock">InStock</option>
                               </select>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'HandoverDate'}
                                        value={createContact.HandoverDate}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="HandoverDate" type="date"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Remarks'}
                                        value={createContact.Remarks}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Remarks" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input className="btn btn-success me-2" type="submit" value="create"/>
                                    <Link className="btn btn-dark" to="/contacts/branch">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        ) : null}
                        </div>
                </div>
            </section>
        </>
    )
};
export default EditBranch;
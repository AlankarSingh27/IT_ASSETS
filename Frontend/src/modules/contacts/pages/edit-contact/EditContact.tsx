import React, { useEffect, useState } from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IContactView } from "../../models/IContactView";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as contactActions from "../../../../redux/contacts/contacts.actions";
import * as contactReducer from "../../../../redux/contacts/contacts.slice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";

// Define the EditContact component
export const EditContact: React.FC = () => {
    // Set up dispatch and navigate hooks
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { contactId } = useParams();
    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeatureKey];
    });

    const { loading, contact: contactRedux, error } = contactState;

    // Set up local state for the edit form
    const [editContact, setEditContact] = useState<IContactView>({
        Employee_Name: "",
        Employee_Id: "",
        Department: "",
        Email_Id: "",
        Contact_No: "",
        Laptop: "",
        Serial_No: "",
        HandoverDate: "",
        Status: "",
        Remarks: ""
    });

    // Set up local state for the create form
    const [contact, setContact] = useState<IContactView>({
        Employee_Name: "",
        Employee_Id: "",
        Department: "",
        Email_Id: "",
        Contact_No: "",
        Laptop: "",
        Serial_No: "",
        HandoverDate: "",
        Status: "Active",
        Remarks: ""
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);


    useEffect(() => {
        if (contactId) {
            dispatch(contactActions.getContactAction({ contactId: contactId }));
        }
    }, [contactId]);

    // If contact data is available, populate the state
    useEffect(() => {
        if (contactRedux && Object.keys(contactRedux).length > 0) {
            const data: any = contactState.contact;
            // Assuming the data array is available in your response
            const updatedEditContact: IContactView = {
                Employee_Name: data.Employee_Name || "",
                Employee_Id: data.Employee_Id || "",
                Department: data.Department || "",
                Email_Id: data.Email_Id || "",
                Contact_No: data.Contact_No || "",
                Laptop: data.Laptop || "",
                Serial_No: data.Serial_No || "",
                HandoverDate: data.HandoverDate || "",
                Status: data.Status || "",
                Remarks: data.Remarks || ""
            };
            setEditContact(updatedEditContact);
        }
    }, [contactRedux]);

    /**
     * when the form field data changes, update the local state for the edit form
     * @param event
     */
    const updateEditInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditContact({
            ...editContact,
            [event.target.name]: event.target.value
        })
    };

    /**
     * Form submit for updating existing contact
     * @param event
     */
    const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (contactId) {
            // Update existing contact
            dispatch(contactActions.updateContactAction({
                contact: editContact,
                contactId: contactId
            })).then((response: any) => {
                if (!response.error) {
                    console.log("Contact updated successfully!");
                    // Optionally, navigate or perform other actions upon successful update
                    setUpdateSuccess(true);
                } else {
                    console.log(response.error); // Handle the error appropriately
                }
            });
        }
    };

    /**
     * when the form field data changes, update the local state for the create form
     * @param event
     */
    const updateCreateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
 // Add this line to log the value
        const value = event.target.type === 'select-one' ? event.target.value : event.target.value;
        setContact({
            ...contact,
            [event.target.name]: value
        });
    };
  


    
    const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Add new contact
        dispatch(contactActions.createContactAction({ contact:contact })).then((response: any) => {
            console.log(response);
            if (!response.error) {
                console.log("Contact created successfully!");
                navigate("/contacts/admin");
            } else {
                console.log(response.error);
            }
        });
    };
    
    return (
        <>
       
            {loading && <Spinner />}
            <NavBar color={'bg-dark'} />
            <Heading heading={'Edit Contact'} color={'text-primary'} />
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)} />}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={e => handleEditSubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Employee_Name'}
                                        value={editContact.Employee_Name}
                                        onChange={e => updateEditInput(e)}
                                        className="form-control" placeholder="Name" type="text" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Employee_Id'}
                                        value={editContact.Employee_Id}
                                        onChange={e => updateEditInput(e)}
                                        className="form-control" placeholder="Name" type="text" />
                                </div>
                                <div className="mb-2">
                                     <input
                                        required={true}
                                        name={'Department'}
                                        value={editContact.Department}
                                        onChange={e => updateEditInput(e)}
                                        className="form-control" placeholder="Department" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Email_Id'}
                                        value={editContact.Email_Id}
                                        onChange={e => updateEditInput(e)}
                                        className="form-control" placeholder="Email" type="email"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Contact_No'}
                                        value={editContact.Contact_No}
                                        onChange={e => updateEditInput(e)}
                                        className="form-control" placeholder="Contact No" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Laptop'}
                                        value={editContact.Laptop}
                                        onChange={e => updateEditInput(e)}
                                        className="form-control" placeholder="Laptop" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Serial_No'}
                                        value={editContact.Serial_No}
                                        onChange={e => updateEditInput(e)}
                                        className="form-control" placeholder="Laptop Serial Number" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'HandoverDate'}
                                        value={editContact.HandoverDate}
                                        onChange={e => updateEditInput(e)}
                                        className="form-control" placeholder="HandoverDate" type="date"/>
                                </div>
                                <div className="mb-2">
                                <select
                                 required={true}
                                 name="Status"
                                 value={editContact.Status}
                                 onChange={(e) => updateEditInput(e)}
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
                                        name={'Remarks'}
                                        value={editContact.Remarks}
                                        onChange={e => updateEditInput(e)}
                                        className="form-control" placeholder="Remarks" type="text"/>
                                </div>
                              
                                
                                <div className="mb-2">
                                    <input className="btn btn-success me-2" type="submit" value="Update" />
                                    <Link className="btn btn-dark" to="/contacts/admin">Cancel</Link>
                                </div>
                            </form>
                            </div>
                            {updateSuccess ? (
                            <div className="col-sm-4">
                            <form onSubmit={e => handleCreateSubmit(e)}>
                            <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Employee_Name'}
                                        value={contact.Employee_Name}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Name" type="text" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Employee_Id'}
                                        value={contact.Employee_Id}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Employee Id" type="text" />
                                </div>
                                <div className="mb-2">
                                     <input
                                        required={true}
                                        name={'Department'}
                                        value={contact.Department}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Department" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Email_Id'}
                                        value={contact.Email_Id}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Email" type="email"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Contact_No'}
                                        value={contact.Contact_No}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Contact No" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Laptop'}
                                        value={contact.Laptop}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Laptop" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Serial_No'}
                                        value={contact.Serial_No}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Laptop Serial Number" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'HandoverDate'}
                                        value={contact.HandoverDate}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="HandoverDate" type="date"/>
                                </div>
                               <div className="mb-2">
                                <select
                                    required={true}
                                    name="Status"
                                    value={contact.Status}
                                    onChange={(e) => updateCreateInput(e)}
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
                                        name={'Remarks'}
                                        value={contact.Remarks}
                                        onChange={e => updateCreateInput(e)}
                                        className="form-control" placeholder="Remarks" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input className="btn btn-success me-2" type="submit" value="Create" />
                                    <Link className="btn btn-dark" to="/contacts/admin">Cancel</Link>
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

export default EditContact;

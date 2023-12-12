import React, {useEffect, useState} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link} from "react-router-dom";
import {IContactView} from "../../models/IContactView";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import {useNavigate} from "react-router-dom";
import {ToastUtil} from "../../../../util/ToastUtil";
import * as contactActions from "../../../../redux/contacts/contacts.actions";
import * as contactReducer from "../../../../redux/contacts/contacts.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";

interface IState {
    loading: boolean;
    errorMessage: string;
}

export const AddContact: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();

    /**
     * get the data from redux
     */
    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeatureKey];
    });

    const {loading,  error} = contactState;

    const [contact, setContact] = useState<IContactView>({
        Employee_Name:"",
        Employee_Id:"",
        Department:"",
        Email_Id:"",
        Contact_No:"",
        Laptop:"",
        Serial_No:"",
        HandoverDate:"",
        Status:"Active",
        Remarks:""
    });

  

    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = event.target.type === 'select-one' ? event.target.value : event.target.value;
        setContact({
            ...contact,
            [event.target.name]: value
        })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(contactActions.createContactAction({contact: contact})).then((response: any) => {
            if (!response.error) {
                navigate("/contacts/admin");
            }
        });
    };
    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Add Product'} color={'text-info'}/>
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)}/>}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Employee_Name'}
                                        value={contact.Employee_Name}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Name" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Employee_Id'}
                                        value={contact.Employee_Id}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Employee Id" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Department'}
                                        value={contact.Department}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Department" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Email_Id'}
                                        value={contact.Email_Id}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Email" type="email"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Contact_No'}
                                        value={contact.Contact_No}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Contact No" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Laptop'}
                                        value={contact.Laptop}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Laptop" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'Serial_No'}
                                        value={contact.Serial_No}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Laptop Serial Number" type="text"/>
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
                                        name={'Remarks'}
                                        value={contact.Remarks}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Remarks" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input className="btn btn-success me-2" type="submit" value="Add Contact"/>
                                    <Link className="btn btn-dark" to="/contacts/admin">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        </div>
                </div>
            </section>
        </>
    )
};
export default AddContact;



import React, {useEffect, useState} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link} from "react-router-dom";
import {IBranchView} from "../../models/IBranchView";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import {useNavigate} from "react-router-dom";
import {ToastUtil} from "../../../../util/ToastUtil";
import * as branchActions from "../../../../redux/branches/branches.actions";
import * as branchReducer from "../../../../redux/branches/branches.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";

interface IState {
    loading: boolean;
    errorMessage: string;
}

export const BranchContact: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();

    /**
     * get the data from redux
     */
    const contactState: branchReducer.BranchState = useSelector((store: RootState) => {
        return store[branchReducer.branchFeatureKey];
    });

    const {loading,  error} = contactState;

    const [contact, setContact] = useState<IBranchView>({
        Branches: "",
        Contact_Person: "",
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

  

    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = event.target.type === 'select-one' ? event.target.value : event.target.value;
        setContact({
            ...contact,
            [event.target.name]: value
        })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(branchActions.createBranchAction({branch: contact})).then((response: any) => {
            if (!response.error) {
                navigate("/contacts/branch");
            }
        });
    };
    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Add Branch'} color={'text-info'}/>
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
                                    <input className="btn btn-success me-2" type="submit" value="Create"/>
                                    <Link className="btn btn-dark" to="/contacts/branch">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        </div>
                </div>
            </section>
        </>
    )
};
export default BranchContact;



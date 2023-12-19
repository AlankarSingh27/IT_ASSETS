import * as XLSX from "xlsx";
import React, { useEffect, useState } from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import { Link } from "react-router-dom";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as contactActions from "../../../../redux/contacts/contacts.actions";
import * as contactReducer from "../../../../redux/contacts/contacts.slice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import { IContactView } from '../../models/IContactView';

export const ContactsAdmin: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState<string>("");
  

 // Replace YourContactType with the actual type of your contact objects

    /**
     * get the data from Redux
     */
    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeatureKey];
    });

    const { loading, contacts, error } = contactState;
    // const [filteredContacts, setFilteredContacts] = useState(contacts);
    useEffect(() => {
        dispatch(contactActions.getAllContactsAction());
    }, []);
    const makeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    const exportToExcel = () => {
    const wsData = [
        [
          "S.No",
          "Date",
          "Employee_Name",
          "Employee_Id",
          "Department",
          "Email_Id",
          "Contact_No",
          "Laptop",
          "Serial_No",
          "HandoverDate",
          "Ststus",
          "Remarks",
        ],
      ];
      
     
  
      // Add data from the repeatedDates to wsData
    contacts.forEach((entry: any, index: any) => {
        wsData.push([
          index + 1,
          entry.date,
          entry.Employee_Name,
          entry.Employee_Id, 
          entry.Department,
          entry.Email_Id, 
          entry.Contact_No,
          entry.Laptop, 
          entry.Serial_No,
          new Date(entry.HandoverDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
           }),
          entry.Status,
          entry.Remarks
        ]);
      });
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "XLIRR Data");
  
      // Save the file with a name, for example: XLIRRData.xlsx
      XLSX.writeFile(wb, "XLIRRData.xlsx");
    };
   
    const filteredContacts: any[] = contacts.filter((contact: any) => {
       
        const query = searchQuery.toLowerCase();
      
        // Define your search criteria here
        const matchesEmployeeName = contact.Employee_Name.toLowerCase().includes(query);
        const matchesEmployeeId = contact.Employee_Id.toLowerCase().includes(query);
        const matchesDepartment = contact.Department.toLowerCase().includes(query);
        const matchesLaptopSerial = contact.Serial_No.toLowerCase().includes(query);
        const matchesStatus = contact.Status.toLowerCase().includes(query);
        return matchesEmployeeName || matchesEmployeeId || matchesDepartment || matchesLaptopSerial|| matchesStatus;
      
      });
      
      
    return (
        <>
            {loading && <Spinner />}
            <NavBar color='bg-dark' />
            <Heading heading='Laptop & Printer Records' color='text-dark' />
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)} />}
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="row">
                                <div className="col">
                                <input
                                        value={searchQuery}
                                        onChange={e => makeSearch(e)}
                                        className="form-control"
                                        placeholder="Search here"
                                        type="text"
                                    />
                                </div>
                                <div className="col">
                                    <Link className="btn btn-success" to={'/contacts/add'}>
                                        <i className="bi bi-plus-circle-fill"></i> New Products
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {filteredContacts.length > 0 ? (
                <section className='mt-3'>
                    <div className="container">
                    <div className="col">
        <button className="btn btn-success" onClick={exportToExcel}>
          Export to Excel
        </button>
      </div>
                        <div className="row">
                            <div className="col">
                                <table className="table table-striped table-hover text-center table-sm">
                                    <thead>
                                        <tr>
                                            <th>SNo</th>
                                            <th>Employee Name</th>
                                            <th>Employee_Id</th>
                                            <th>Department</th>
                                            <th>Email_Id</th>
                                            <th>Contact_No</th>
                                            <th>Laptop</th>
                                            <th>Serial_No</th>
                                            <th>HandoverDate</th>
                                            <th>Status</th>
                                            <th>Remarks</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {filteredContacts.map((contact, index) => (
                                                <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{contact.Employee_Name}</td>
                                                <td>{contact.Employee_Id}</td>
                                                <td>{contact.Department}</td>
                                                <td>{contact.Email_Id}</td>
                                                <td>{contact.Contact_No}</td>
                                                <td>{contact.Laptop}</td>
                                                <td>{contact.Serial_No}</td>
                                                 <td> {new Date(contact.HandoverDate).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: '2-digit',
                                                 })}</td>
                                                <td className={contact.Status.trim().toLowerCase() === 'active' || contact.Status.trim().toLowerCase() === 'instock' ? 'text-success' : 'text-danger'}>{contact.Status}</td>
                                                 <td>{contact.Remarks}</td>
                                                 <td><td><Link className="btn btn-primary m-1" to={`/contacts/edit/${contact._id}`}>
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link></td></td>
                                                 </tr>
                                                   ))}
                                                 
                                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="container mt-3">
                    <div className="row">
                        <div className="col text-center">
                            <p className="h4 text-danger">No Records Found</p>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default ContactsAdmin;


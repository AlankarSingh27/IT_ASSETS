import React, { useEffect, useState } from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import { Link } from "react-router-dom";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as branchActions from "../../../../redux/branches/branches.actions";
import * as branchReducer from "../../../../redux/branches/branches.slice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import * as XLSX from "xlsx";

export const BranchAdmin: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState<string>("");
  

 // Replace YourContactType with the actual type of your contact objects

    /**
     * get the data from Redux
     */
    const branchState: branchReducer.BranchState = useSelector((store: RootState) => {
        return store[branchReducer.branchFeatureKey];
    });

    const { loading, branches, error } = branchState;
    
    useEffect(() => {
        dispatch(branchActions.getAllBranchesAction());
    }, []);
    const makeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    const exportToExcel = () => {
        const wsData = [
            [
                "SNo",
                "Branch_Code",
                "Branches",
                "Contact_Person",
                "Person_Contact",
                "Branch_Address",
                "Laptop_Manufacture",
                "Laptop_SerialNo",
                "Printer_Manufacture",
                "Printer_SerialNo",
                "Status",
                "HandoverDate",
                "Remarks"
                
            ],
          ];
          
         
      
          // Add data from the repeatedDates to wsData
          branches.forEach((entry: any, index: any) => {
            wsData.push([
              index + 1,
              entry.Branches,
              entry.Branch_Code,
              entry.Contact_Person,
              entry.Person_Contact, 
              entry.Branch_Address,
              entry.Laptop_Manufacture, 
              entry.Laptop_SerialNo,
              entry.Printer_Manufacture, 
              entry.Printer_SerialNo,
              entry.Status,
              new Date(entry.HandoverDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
               }),
              entry.Remarks
            ]);
          });
          const ws = XLSX.utils.aoa_to_sheet(wsData);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "XLIRR Data");
      
          // Save the file with a name, for example: XLIRRData.xlsx
          XLSX.writeFile(wb, "XLIRRData.xlsx");
        };
   
    const filteredContacts: any[] = branches.filter((contact: any) => {
       
        const query = searchQuery.toLowerCase();
      
        // Define your search criteria here
        const matchesEmployeeName = contact.Branches.toLowerCase().includes(query);
        const matchesEmployee = contact.Contact_Person.toLowerCase().includes(query);
        const matchesLaptopSerial = contact.Laptop_SerialNo.toLowerCase().includes(query);
        const matchesStatus = contact.Status.toLowerCase().includes(query);
        const matchesPrinterSerial = contact.Printer_SerialNo.toLowerCase().includes(query);
        return matchesEmployeeName || matchesEmployee || matchesLaptopSerial|| matchesStatus || matchesPrinterSerial;
      
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
                                    <Link className="btn btn-success" to={'/branch/add'}>
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
                                <table className="table table-sm table-striped table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>SNo</th>
                                            <th>Branches</th>
                                            <th>BranchCode</th>
                                            <th>Contact_Person</th>
                                            <th>Person_Contact</th>
                                            <th>Branch_Address</th>
                                            <th>Laptop_Manufacture</th>
                                            <th>Laptop_SerialNo</th>
                                            <th>Printer_Manufacture</th>
                                            <th>Printer_SerialNo</th>
                                            <th>Status</th>
                                            <th>HandoverDate</th>
                                            <th>Remarks</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {filteredContacts.map((contact: any, index:number) => (
                                                <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{contact.Branches}</td>
                                                <td>{contact.Branch_Code}</td>
                                                <td>{contact.Contact_Person}</td>
                                                <td>{contact.Person_Contact}</td>
                                                <td>{contact.Branch_Address}</td>
                                                <td>{contact.Laptop_Manufacture}</td>
                                                <td>{contact.Laptop_SerialNo}</td>
                                                <td>{contact.Printer_Manufacture}</td>
                                                 <td> {contact.Printer_SerialNo}</td>
                                                 <td className={contact.Status.trim().toLowerCase() === 'active' || contact.Status.trim().toLowerCase() === 'instock' ? 'text-success' : 'text-danger'}>{contact.Status}</td>
                                                 <td>{new Date(contact.HandoverDate).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: '2-digit',
                                                 })}</td>
                                                 <td>{contact.Remarks}</td>
                                                 <td><td><Link className="btn btn-primary m-1" to={`/branches/edit/${contact._id}`}>
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

export default BranchAdmin;


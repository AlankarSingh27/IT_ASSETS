import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./modules/layout/pages/home/Home";
import ContactsAdmin from './modules/contacts/pages/contacts-admin/ContactsAdmin';
import EditContact from './modules/contacts/pages/edit-contact/EditContact';
import NotFound404 from "./modules/layout/pages/not-found/NotFound404";
import {ToastContainer} from "react-toastify";
import AddContact from './modules/contacts/pages/add-contact/AddContact';
import BranchAdmin from './modules/contacts/pages/branch-contact/BranchContact';
import EditBranch from './modules/contacts/pages/edit-branch/EditBranch';
import AddBranch from './modules/contacts/pages/add-branch/AddBranch'
const App: React.FC = () => {
    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                     <Route path={'/contacts/admin'} element={<ContactsAdmin/>}/>
                     <Route path={'/contacts/branch'} element={<BranchAdmin/>}/>
                     <Route path={'/contacts/add'} element={<AddContact/>}/>
                     <Route path={'/branch/add'} element={<AddBranch/>}/>
                    <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
                    <Route path={'/branches/edit/:contactId'} element={<EditBranch/>}/>
                    <Route path={'*'} element={<NotFound404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

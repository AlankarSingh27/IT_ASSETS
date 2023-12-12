import {createAsyncThunk} from "@reduxjs/toolkit";
import {IContactView} from "../../modules/contacts/models/IContactView";
import {ContactService} from "../../modules/contacts/services/ContactService";

/**
 * to get all contacts
 */
export const getAllContactsAction: any = createAsyncThunk("contacts/getAllContactsAction",
    async (payload: {}, {rejectWithValue}): Promise<IContactView[] | any> => {
        try {
            const response = await ContactService.getAllContacts();
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 *  get a contact
 */
export const getContactAction: any = createAsyncThunk("contacts/getContactAction",
    async (payload: { contactId: string }, {rejectWithValue}): Promise<IContactView | any> => {
        try {
            const {contactId} = payload;
            const response = await ContactService.getContact(contactId);
            // if (response && response.data) {
            //     dispatch(({contact: response.data})); // get the group information when we get the contact object
            // }
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * create a contact
 */
export const createContactAction: any = createAsyncThunk("contacts/createContactAction",
    async (payload: {contact: IContactView }, {rejectWithValue}): Promise<IContactView | any> => {
        try {
            const {contact}= payload;
            const response = await ContactService.createContact(contact);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * Update a contact
 */
export const updateContactAction: any = createAsyncThunk("contacts/updateContactAction",
    async (payload: { contact: IContactView, contactId: string }, {rejectWithValue}): Promise<IContactView | any> => {
        try {
            const {contact, contactId} = payload;
            const response = await ContactService.updateContact(contact, contactId);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });









import {createAsyncThunk} from "@reduxjs/toolkit";
import {IBranchView} from "../../modules/contacts/models/IBranchView";
import {BranchService} from "../../modules/contacts/services/BranchService";
/**
 * to get all branches
 */
export const getAllBranchesAction: any = createAsyncThunk("branches/getAllBranchesAction",
    async (payload: {}, {rejectWithValue}): Promise<IBranchView[] | any> => {
        try {
            const response = await BranchService.getAllBranches();
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 *  get a branch
 */
export const getBranchAction: any = createAsyncThunk("branches/getBranchAction",
    async (payload: { contactId: string }, {rejectWithValue}): Promise<IBranchView | any> => {
        try {
            const {contactId} = payload;
            const response = await BranchService.getBranch(contactId);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * create a branch
 */
export const createBranchAction: any = createAsyncThunk("branches/createBranchAction",
    async (payload: {branch: IBranchView}, {rejectWithValue}): Promise<IBranchView | any> => {
        try {
            const {branch}= payload;
            const response = await BranchService.createBranch(branch);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * Update a branch
 */
export const updateBranchAction: any = createAsyncThunk("branches/updateBranchAction",
    async (payload: { branch: IBranchView, contactId: string }, {rejectWithValue}): Promise<IBranchView | any> => {
        try {
            const {branch, contactId} = payload;
            console.log(payload.branch);
            console.log(payload.contactId);
            const response = await BranchService.updateBranch(branch, contactId);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });









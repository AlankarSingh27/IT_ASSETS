import {combineReducers} from "@reduxjs/toolkit";
import * as contactReducer from "./contacts/contacts.slice";
import * as branchReducer from "./branches/branches.slice"
/**
 *
 */
const rootReducer = combineReducers({
    [contactReducer.contactFeatureKey]: contactReducer.contactSlice.reducer,
    [branchReducer.branchFeatureKey]: branchReducer.branchSlice.reducer
});
export default rootReducer;
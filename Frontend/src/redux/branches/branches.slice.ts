// import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
// import {IBranchView} from "../../modules/contacts/models/IBranchView";
// import * as branchActions from "./branches.actions";
// import {ToastUtil} from "../../util/ToastUtil";


// export const branchFeatureKey = "branchFeature";

// export interface BranchState {
//     loading: boolean;
//     error: SerializedError;
//     branches: IBranchView[];
//     branch: IBranchView;
   
// }

// const initialState: BranchState = {
//     loading: false,
//     error: {} as SerializedError,
//     branches: [] as IBranchView[],
//     branch: {} as IBranchView,
    
// };

// export const branchSlice = createSlice({
//     name: 'branchSlice',
//     initialState: initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         // getAllContactsAction
//         builder.addCase(branchActions.getAllBranchesAction.pending, (state, action) => {
//             state.loading = true;
//         }).addCase(branchActions.getAllBranchesAction.fulfilled, (state, action) => {
//             state.loading = false;
//             state.branches = action.payload;
//         }).addCase(branchActions.getAllBranchesAction.rejected, (state, action) => {
//             state.loading = false;
//             ToastUtil.displayErrorToast("Unable to get branches from server");
//             if (isRejectedWithValue(action)) {
//                 state.error = action.error
//             }
//         })

//         // getContactAction
//         builder.addCase(branchActions.getBranchAction.pending, (state, action) => {
//             state.loading = true;
//         }).addCase(branchActions.getBranchAction.fulfilled, (state, action) => {
//             state.loading = false;
//             state.branch = action.payload;
//         }).addCase(branchActions.getBranchAction.rejected, (state, action) => {
//             state.loading = false;
//             ToastUtil.displayErrorToast("Unable to get the branch from server");
//             if (isRejectedWithValue(action)) {
//                 state.error = action.error
//             }
//         })

//         // createContactAction
//         builder.addCase(branchActions.createBranchAction.pending, (state, action) => {
//             state.loading = true;
//         }).addCase(branchActions.createBranchAction.fulfilled, (state, action) => {
//             state.loading = false;
//             ToastUtil.displaySuccessToast("Branch Creation is Success!");
//         }).addCase(branchActions.createBranchAction.rejected, (state, action) => {
//             state.loading = false;
//             ToastUtil.displayErrorToast("Branch Creation is Failed!");
//             if (isRejectedWithValue(action)) {
//                 state.error = action.error
//             }
//         })

//         // updateContactAction
//         builder.addCase(branchActions.updateBranchAction.pending, (state, action) => {
//             state.loading = true;
//         }).addCase(branchActions.createBranchAction.fulfilled, (state, action) => {
//             state.loading = false;
//             ToastUtil.displaySuccessToast("Branch Update is Success!");
//         }).addCase(branchActions.createBranchAction.rejected, (state, action) => {
//             state.loading = false;
//             ToastUtil.displayErrorToast("Branch Update is Failed!");
//             if (isRejectedWithValue(action)) {
//                 state.error = action.error
//             }
//         })

      
//     }
// })
import { createSlice, isRejectedWithValue, SerializedError } from "@reduxjs/toolkit";
import { IBranchView } from "../../modules/contacts/models/IBranchView";
import * as branchActions from "./branches.actions";
import { ToastUtil } from "../../util/ToastUtil";

export const branchFeatureKey = "branchFeature";

export interface BranchState {
  loading: boolean;
  error: SerializedError;
  branches: IBranchView[];
  branch: IBranchView;
}

const initialState: BranchState = {
  loading: false,
  error: {} as SerializedError,
  branches: [] as IBranchView[],
  branch: {} as IBranchView,
};

export const branchSlice = createSlice({
  name: 'branchSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Change the action type names to make them unique, for example:
    
    // getAllBranchesAction
    builder.addCase(branchActions.getAllBranchesAction.pending, (state, action) => {
      state.loading = true;
    }).addCase(branchActions.getAllBranchesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.branches = action.payload;
    }).addCase(branchActions.getAllBranchesAction.rejected, (state, action) => {
      state.loading = false;
      ToastUtil.displayErrorToast("Unable to get branches from the server");
      if (isRejectedWithValue(action)) {
        state.error = action.error;
      }
    })

    // getBranchAction
    builder.addCase(branchActions.getBranchAction.pending, (state, action) => {
      state.loading = true;
    }).addCase(branchActions.getBranchAction.fulfilled, (state, action) => {
      state.loading = false;
      state.branch = action.payload;
    }).addCase(branchActions.getBranchAction.rejected, (state, action) => {
      state.loading = false;
      ToastUtil.displayErrorToast("Unable to get the branch from the server");
      if (isRejectedWithValue(action)) {
        state.error = action.error;
      }
    })

    // createBranchAction
    builder.addCase(branchActions.createBranchAction.pending, (state, action) => {
      state.loading = true;
    }).addCase(branchActions.createBranchAction.fulfilled, (state, action) => {
      state.loading = false;
      ToastUtil.displaySuccessToast("Branch Creation is Success!");
    }).addCase(branchActions.createBranchAction.rejected, (state, action) => {
      state.loading = false;
      ToastUtil.displayErrorToast("Branch Creation is Failed!");
      if (isRejectedWithValue(action)) {
        state.error = action.error;
      }
    })

    // updateBranchAction
    builder.addCase(branchActions.updateBranchAction.pending, (state, action) => {
      state.loading = true;
    }).addCase(branchActions.updateBranchAction.fulfilled, (state, action) => {
      state.loading = false;
      ToastUtil.displaySuccessToast("Branch Update is Success!");
    }).addCase(branchActions.updateBranchAction.rejected, (state, action) => {
      state.loading = false;
      ToastUtil.displayErrorToast("Branch Update is Failed!");
      if (isRejectedWithValue(action)) {
        state.error = action.error;
      }
    })
  }
});

export default branchSlice.reducer;
















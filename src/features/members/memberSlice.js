import { createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
    name: 'members',
    initialState: {
        // hardcoded members due to no backend
        // this would ideally be empty and load the members from an api
        allMembers: [
            { id: 1, name: 'Jack' },
            { id: 2, name: 'Laura' },
            { id: 3, name: 'Wang' },
            { id: 4, name: 'Frank' },
        ],
        // tracking last member id to simplify keeping track of unique ids
        // when members have been deleted as length would not be appropriate
        // these would be generated on the backend and stored in a database
        latestMemberId: 4,
        memberSearchTerm: '',
        memberInEditMode: null,
        memberForDeletion: null,
        newMemberName: '',
    },
    reducers: {
        createMember: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            const id = state.latestMemberId + 1;
            const name = state.newMemberName;
            if (!name) {
                return;
            }
            state.allMembers = [...state.allMembers, { id, name }];
            state.latestMemberId = id;
            state.memberInEditMode = null;
            state.newMemberName = '';
        },
        deleteMember: (state, action) => {
            state.allMembers = state.allMembers.filter(member => member.id !== action.payload);
            state.memberInEditMode = null;
            state.memberForDeletion = null;
        },
        setMemberForDeletion: (state, action) => {
            const [memberForDeletion] = state.allMembers.filter(member => member.id === action.payload);
            state.memberForDeletion = memberForDeletion;
        },
        clearMemberForDeletion: (state, action) => {
            state.memberForDeletion = null;
        },
        updateMember: (state, action) => {
            state.memberInEditMode = null;
        },
        setMemberInEditMode: (state, action) => {
            const [memberToEdit] = state.allMembers.filter(member => member.id === action.payload);
            state.memberInEditMode = memberToEdit;
        },
        updateMemberInEditMode: (state, action) => {
            state.memberInEditMode = { ...action.payload };
        },
        clearMemberInEditMode: (state) => {
            state.memberInEditMode = null;
        },
        updateMemberSearchTerm: (state, action) => {
            state.memberSearchTerm = action.payload;
            state.memberInEditMode = null;
        },
        updateNewMemberName: (state, action) => {
            state.newMemberName = action.payload;
        },
        applyChangesToMemberInEditMode: (state) => {
            const otherMembers = state.allMembers.filter(member => member.id !== state.memberInEditMode.id);
            state.allMembers = [...otherMembers, { ...state.memberInEditMode }];
            state.memberInEditMode = null;
        },
    },
});

export const { createMember, deleteMember, setMemberForDeletion, clearMemberForDeletion, updateMember, updateMemberSearchTerm, updateNewMemberName, setMemberInEditMode, clearMemberInEditMode, updateMemberInEditMode, applyChangesToMemberInEditMode } = memberSlice.actions;

export default memberSlice.reducer;
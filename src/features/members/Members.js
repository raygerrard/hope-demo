import { Typography } from '@mui/material';
import * as React from 'react';
import AddMemberForm from './AddMemberForm';
import DeleteMemberConfirmModal from './DeleteMemberConfirmModal';
import MemberListingTable from './MemberListingTable';
import SearchMembersForm from './SearchMembersForm';

export default function Members() {
    return (
        <div>
            <Typography color='white' variant="h2" align='center' gutterBottom>
                Name Book
            </Typography>
            <SearchMembersForm />
            <AddMemberForm />
            <MemberListingTable />
            <DeleteMemberConfirmModal />
        </div>
    );
};
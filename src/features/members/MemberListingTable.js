import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMemberForDeletion, setMemberInEditMode, updateMemberInEditMode, applyChangesToMemberInEditMode, clearMemberInEditMode } from './memberSlice';
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from '@mui/material';

export default function MemberListingTable() {
  const dispatch = useDispatch();
  const { memberInEditMode, allMembers, memberSearchTerm } = useSelector((state) => state.members);
  const [members, setMembers] = React.useState(allMembers);
  const [sort, setSort] = React.useState('asc');

  const deleteMemberById = (memberId) => {
    dispatch(setMemberForDeletion(memberId));
  };

  const editMemberById = (memberId) => {
    dispatch(setMemberInEditMode(memberId));
  };

  const updateEditField = (event) => {
    dispatch(updateMemberInEditMode({
      ...memberInEditMode,
      name: event.target.value,
    }));
  };

  const cancelChangesToMember = () => {
    dispatch(clearMemberInEditMode());
  };

  const saveChangesToMember = () => {
    dispatch(applyChangesToMemberInEditMode());
  };

  const toggleSortDirection = () => {
    setSort((current) => current === 'asc' ? 'desc' : 'asc');
  };

  React.useEffect(() => {
    const filteredMembers = allMembers.filter(member =>
      member.name.toLowerCase().indexOf(memberSearchTerm.toLowerCase()) > -1
    );
    filteredMembers.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName < bName) {
        return sort === 'asc' ? -1 : 1;
      }
      if (aName > bName) {
        return sort === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setMembers(filteredMembers);
  }, [allMembers, memberSearchTerm, sort]);

  if (!members || members.length < 1) {
    return;
  }

  return (
    <div style={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>
                Name
                <TableSortLabel onClick={toggleSortDirection} active direction={sort}></TableSortLabel>
              </TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((row) => (
              <TableRow key={row.name}>
                <TableCell width={80} component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">
                  {
                    memberInEditMode?.id === row.id ?
                      <TextField value={memberInEditMode.name} onChange={updateEditField} />
                      :
                      <TextField sx={{
                        "& fieldset": { border: 'none' },
                      }} disabled={true} value={row.name} onChange={updateEditField} />
                  }
                </TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <Button onClick={() => deleteMemberById(row.id)}>
                      Delete
                    </Button>
                    {
                      memberInEditMode?.id === row.id ?
                        <>
                          <Button onClick={saveChangesToMember}>
                            Save
                          </Button>
                          <Button onClick={cancelChangesToMember}>
                            Cancel
                          </Button>
                        </>
                        :
                        <Button onClick={() => editMemberById(row.id)}>
                          Edit
                        </Button>
                    }
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
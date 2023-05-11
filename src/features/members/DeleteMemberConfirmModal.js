import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMember, clearMemberForDeletion } from './memberSlice';

export default function DeleteMemberConfirmModal() {
  const dispatch = useDispatch();
  const { memberForDeletion } = useSelector((state) => state.members);

  const confirmDeletion = () => {
    const memberId = memberForDeletion.id;
    dispatch(deleteMember(memberId));
  };

  const cancelDeletion = () => {
    dispatch(clearMemberForDeletion());
  };

  return (
    <Dialog
        open={memberForDeletion}
        keepMounted
        onClose={cancelDeletion}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeletion}>Cancel</Button>
          <Button onClick={confirmDeletion}>Yes</Button>
        </DialogActions>
      </Dialog>
  );
};
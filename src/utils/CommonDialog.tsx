import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  children: React.ReactNode;
  loading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const CommonDialog: React.FC<CommonDialogProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  children,
  loading = false,
  maxWidth = 'xs'
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" size="small">
          {cancelButtonText}
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          size="small"
          disabled={loading}
        >
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
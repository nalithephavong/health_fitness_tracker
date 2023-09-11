import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { RowType } from '@/templates/Interfaces';

interface DeleteDialogProps {
    selected: string[];
    showDialog: boolean;
    setShowDialog: (value:boolean) => void;
    callbackFn: (value:unknown) => void;
    title: string;
    description: string;
    selectedDetail: RowType[];
}

export default function DeleteDialog(props:DeleteDialogProps) {
    const { selected, selectedDetail, showDialog, setShowDialog, callbackFn, title, description } = props;

    const handleClose = () => {
        setShowDialog(false);
    };

    const handleDelete = () => {
        callbackFn(selected);
        setShowDialog(false);
    };

    return (
        <div>
            <Dialog
                open={showDialog}
                onClose={handleClose}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title" sx={{ fontWeight: 'bold' }}>
                {title}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    {description} {selectedDetail.map((item) => item.name).join(", ")}?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDelete} autoFocus variant='contained'>Delete</Button>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

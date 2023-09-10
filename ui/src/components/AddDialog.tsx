import * as React from 'react';
import { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem
} from '@mui/material';

import { StatusType } from '@/templates/Interfaces';

interface AddDialogProps {
    showDialog: boolean;
    setShowDialog: (value:boolean) => void;
    callbackFn: (value:unknown) => void;
    title: string;
    description: string;
    fields: {id: string, label: string, type: string}[];
    statusOpts: StatusType[];
}

type DataType = {
    [key:string]: string;
}

export default function AddDialog(props:AddDialogProps) {
    const { showDialog, setShowDialog, callbackFn, title, description, fields, statusOpts } = props;
    const [data, setData] = useState<DataType>({});
    const [status, setStatus] = useState(statusOpts[0]?.id || "");

    const handleClose = () => {
        setShowDialog(false);
    };

    const handleAdd = () => {
        let newData = data;
        newData["status"] = status;

        callbackFn(newData);
        setShowDialog(false);
    };

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        let id = event.target.id;
        let newValue = event.target.value;
        let newData = data;
        newData[id] = newValue;
        setData(newData);
    };

    const handleStatusChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    };

    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                    {
                        fields.map((field) => {
                            return (
                                <TextField
                                    key={field.id}
                                    autoFocus
                                    margin="dense"
                                    id={field.id}
                                    label={field.label}
                                    type={field.type}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            );
                        })
                    }
                    {
                        statusOpts.length > 0 ? (
                            <TextField
                                autoFocus
                                select
                                margin="dense"
                                id="status"
                                label="Status"
                                fullWidth
                                variant="standard"
                                onChange={handleStatusChange}
                                value={status}
                            >
                                {statusOpts.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (null)
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd} autoFocus>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

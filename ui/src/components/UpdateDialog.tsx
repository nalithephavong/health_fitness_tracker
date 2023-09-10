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
import { RowType, StatusType } from '@/templates/Interfaces';

interface UpdateDialogProps {
    selected: string[];
    showDialog: boolean;
    setShowDialog: (value:boolean) => void;
    callbackFn: (value:unknown) => void;
    title: string;
    description: string;
    statusOpts: StatusType[];
    fields: {id: string, label: string, type: string}[];
    selectedDetail: RowType[];
    first: boolean;
}

type DataType = {
    [key:string]: string;
}

export default function UpdateDialog(props:UpdateDialogProps) {
    const { selected, selectedDetail, showDialog, setShowDialog, callbackFn, title, description, statusOpts, fields, first } = props;
    const [status, setStatus] = useState(statusOpts[0]?.id || "");
    const [data, setData] = useState<DataType>({});

    let itemsToUpdate = selected;
    let itemsToUpdateDetail = selectedDetail;
    if (first) {
        itemsToUpdate = selected[0] ? [selected[0]]:[];
        itemsToUpdateDetail = selectedDetail[0] ? [selectedDetail[0]]:[]; 
    }

    const handleClose = () => {
        setShowDialog(false);
    };

    const handleUpdate = () => {
        let newData = data;
        newData["status"] = status;

        callbackFn( { 
            data: newData, 
            selected: itemsToUpdate 
        }
        );
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
                        {description} {itemsToUpdateDetail[0]?itemsToUpdateDetail[0].name:""}?
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
                                    value={itemsToUpdateDetail[0]?itemsToUpdateDetail[0][field.id]:undefined}
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
                    <Button onClick={handleUpdate} autoFocus>Update</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

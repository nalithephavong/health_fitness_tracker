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

interface UpdateFoodDialogProps {
    selected: string[];
    showDialog: boolean;
    setShowDialog: (value:boolean) => void;
    callbackFn: (value:unknown) => void;
    title: string;
    description: string;
    statusOpts: StatusType[];
    fields: {id: string, label: string, type: string}[];
    selectedDetail: RowType[];
}

type DataType = {
    [key:string]: string;
}

export default function UpdateFoodDialog(props:UpdateFoodDialogProps) {
    const { 
        selected, 
        selectedDetail, 
        showDialog, 
        setShowDialog, 
        callbackFn, 
        title, 
        description, 
        statusOpts, 
        fields 
    } = props;
    const [status, setStatus] = useState(selectedDetail[0]?.status ?? statusOpts[0]?.id);
    const [amount, setAmount] = useState<number>(parseFloat(selectedDetail[0]?.amount ?? "0"));
    const [serving, setServing] = useState(selectedDetail[0]?.serving);
    const [calories, setCalories] = useState<number>(parseFloat(selectedDetail[0]?.calories ?? "0"));

    const handleClose = () => {
        setShowDialog(false);
    };

    const handleUpdate = () => {
        const newData = {
            status,
            amount,
            serving,
            calories
        };

        callbackFn( { 
            data: newData, 
            selected 
        }
        );
        setShowDialog(false);
    };

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const newValue = event.target.value;
        if (id === "calories") {
            setCalories(parseFloat(newValue));
            return;
        }
        
        if (id === "amount") {
            setAmount(parseFloat(newValue));
            return;
        }

        if (id === "serving") {
            setServing(newValue);
            return;
        }
    };

    const handleStatusChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    };

    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description} {selectedDetail[0]?selectedDetail[0].name:""}?
                    </DialogContentText>
                    <TextField
                        key="amount"
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={amount}
                    />
                    <TextField
                        key="serving"
                        autoFocus
                        margin="dense"
                        id="serving"
                        label="Serving"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={serving}
                    />
                    <TextField
                        key="calories"
                        autoFocus
                        margin="dense"
                        id="calories"
                        label="Calories"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={calories}
                    />
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
                    <Button onClick={handleUpdate} autoFocus variant='contained'>Update</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

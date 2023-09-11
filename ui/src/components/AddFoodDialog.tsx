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
import SearchFoodsDialog from './SearchFoodsDialog';

interface AddFoodDialogProps {
    showDialog: boolean;
    setShowDialog: (value:boolean) => void;
    callbackFn: (value:unknown) => void;
    tableID: string;
    tableTitle: string;
    title: string;
    description: string;
    fields: {id: string, label: string, type: string}[];
    statusOpts: StatusType[];
    date: string;
}

type DataType = {
    [key:string]: string | number;
}

type FoodRecord = {
    fdcId: number;
    description: string;
    brandName: string;
    servingSize: number;
    servingSizeUnit: string;
    foodNutrients: FoodNutrients[];
}

type FoodNutrients = {
    nutrientId: number;
    unitName: string;
    value: number;
}

export default function AddFoodDialog(props:AddFoodDialogProps) {
    const { 
        showDialog, 
        setShowDialog, 
        callbackFn, 
        title, 
        description, 
        statusOpts, 
        tableID, 
        tableTitle,
        date
    } = props;
    const [status, setStatus] = useState(statusOpts[0]?.id ?? "");
    const [showSearch, setShowSearch] = useState(false);
    const [calories, setCalories] = useState(0);
    const [name, setName] = useState("");
    const [serving, setServing] = useState("");
    const [amount, setAmount] = useState(0);

    const clearData = () => {
        setCalories(0);
        setName("");
        setServing("");
        setAmount(0);
    };

    const createData = ():DataType => {
        return ({
            "meal": tableID,
            "name": name,
            "serving": serving,
            "amount": amount,
            "calories": calories,
            "status": status,
            "date": date
        });
    };

    const handleClose = () => {
        clearData();
        setShowDialog(false);
    };

    const handleAdd = () => {
        const newData = createData();
        callbackFn(newData);
        clearData();
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

        if (id === "name") {
            setName(newValue);
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

    const handleSearchReturn = (selectedItem:FoodRecord) => {
        if (Object.entries(selectedItem).length > 0) {
            setName(selectedItem.description);
            setServing(selectedItem.servingSizeUnit);
            setAmount(selectedItem.servingSize);
            const calorieRecord = selectedItem.foodNutrients.find((nutrient) => nutrient.nutrientId === 1008);
            setCalories(calorieRecord?.value ?? 0);
        }

        setShowSearch(false);
    };

    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description} {tableTitle}
                    </DialogContentText>
                    <TextField
                        key="name"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={name}
                    />
                    <TextField
                        key="amount"
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="text"
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
                    <Button onClick={handleAdd} autoFocus variant='contained'>Add</Button>
                    <Button onClick={() => setShowSearch(true)} >Search</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <SearchFoodsDialog 
                open={showSearch} 
                onClose={(selected) => handleSearchReturn(selected as FoodRecord)}
            />
        </div>
    );
}

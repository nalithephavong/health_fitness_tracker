import * as React from 'react';
import { useState } from 'react';
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    DialogTitle,
    Dialog,
    TextField,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';
import { Restaurant as FoodIcon } from '@mui/icons-material';
import { AppConfig } from '@/templates/AppConfig';

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

export interface SearchDialogProps {
    open: boolean;
    onClose: (value: object) => void;
}

export default function SearchFoodsDialog(props: SearchDialogProps) {
    const { onClose, open } = props;
    const [query, setQuery] = useState("");
    const [data, setData] = useState<FoodRecord[]>([]);

    const handleClose = () => {
        onClose({});
        setData([]);
    };

    const handleListItemClick = (record: FoodRecord) => {
        onClose(record);
        setData([]);
    };

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        fetch(`${AppConfig.apiUrl}/health/search/${query}`)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            setData(json.foods) 
        })
        .catch((err:Error) => {
            console.error(err);
        });
    };

    const getCalories = (nutrients: FoodNutrients[]) => {
        const calorieRecord = nutrients.find((nutrient) => nutrient.nutrientId === 1008);
        return `${calorieRecord?.value} ${calorieRecord?.unitName}`
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Search</DialogTitle>
            <DialogContent>
                <TextField
                        autoFocus
                        margin="dense"
                        id="search"
                        label="Search Foods"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                />
                <List dense={true} sx={{ pt: 2 }}>
                    {data.map((record) => (
                        <ListItem disableGutters key={record.fdcId}>
                            <ListItemButton onClick={() => handleListItemClick(record)}>
                            <ListItemAvatar>
                                <Avatar >
                                    <FoodIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={record.description} 
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {record.brandName}
                                    </Typography>
                                    {` Serving: `}
                                    {record.servingSize} {record.servingSizeUnit}
                                    { ` | Calories: ` }
                                    {getCalories(record.foodNutrients)}
                                    </React.Fragment>
                                }
                            />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSearch} autoFocus>Search</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
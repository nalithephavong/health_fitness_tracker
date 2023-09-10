import { ChipPropsColorOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

export interface ToolbarActions {
    name: string;
    icon: string;
    fields: {id: string, label: string, type: string}[];
    callback: (value:unknown) => void;
    tooltip: string;
    title: string;
    description: string;
}

export interface HeaderCellType {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

export interface RowType {
    id: string;
    [key: string]: string;
}

export interface UpdateType {
    data: Object;
    selected: string[];
}

export interface StatusType {
    id: string;
    label: string;
    color: OverridableStringUnion<"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ChipPropsColorOverrides> | undefined;
}
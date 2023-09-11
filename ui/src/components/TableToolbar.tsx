import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { useState } from "react";
import { 
    Toolbar,
    Typography,
    Tooltip,
    IconButton
} from "@mui/material";
import { 
    AddCircle as AddIcon,
    Delete as DeleteIcon,
    Edit as UpdateIcon
} from '@mui/icons-material';

import { RowType, StatusType, ToolbarActions } from '@/templates/Interfaces';
import DeleteDialog from './DeleteDialog';
import AddFoodDialog from './AddFoodDialog';
import UpdateFoodDialog from './UpdateFoodDialog';

interface TableToolbarProps {
    tableID: string;
    numSelected: number;
    title: string;
    toolbarActions: ToolbarActions[];
    selectedToolbarActions: ToolbarActions[];
    selected: string[];
    callback: () => void;
    statusOpts: StatusType[];
    selectedDetail: RowType[];
}

type IconsType = {
  [key: string]: JSX.Element
}

const Icons:IconsType = {
  AddIcon: <AddIcon />,
  DeleteIcon: <DeleteIcon />,
  UpdateIcon: <UpdateIcon />
};
  
export default function TableToolbar(props: TableToolbarProps) {
    const { 
      tableID,
      numSelected, 
      title, 
      toolbarActions, 
      selectedToolbarActions, 
      selected, 
      selectedDetail, 
      callback, 
      statusOpts 
    } = props;
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const setShow = (event: React.MouseEvent<unknown>) => {
      const { currentTarget } = event;
      const eventName = (currentTarget as HTMLButtonElement).id;
      if (eventName === "Delete") {
        setShowDelete(true);
      } else if (eventName === "Add") {
        setShowAdd(true);
      } else if (eventName === "Update") {
        setShowUpdate(true);
      }
    };

    const getToolbarActions = (toolbarActions:ToolbarActions[], selected:string[]) => {
      const items = toolbarActions.map((action,index) => {
          if (selected.length > 1 && action.name === "Update") return;
          
          return (
            <React.Fragment key={index}>
              <Tooltip title={action.tooltip} key={index}>
                <IconButton id={action.name} onClick={(event) => setShow(event)} color="warning">
                  {Icons[action.icon]}
                </IconButton>
              </Tooltip>
              {
                action.name === "Delete" ? ( 
                  <DeleteDialog
                    key={`${index}-DeleteDialog`} 
                    title={action.title}
                    description={action.description}
                    selected={selected}
                    selectedDetail={selectedDetail} 
                    showDialog={showDelete} 
                    setShowDialog={setShowDelete}
                    callbackFn={(selected) => {
                      action.callback(selected);
                      callback();
                    }} 
                  />
                ) : action.name === "Add" ? (
                  <AddFoodDialog
                    tableID={tableID}
                    tableTitle={title}
                    key={`${index}-AddDialog`} 
                    title={action.title}
                    description={action.description}
                    showDialog={showAdd}
                    setShowDialog={setShowAdd}
                    fields={action.fields}
                    statusOpts={statusOpts}
                    callbackFn={(data) => {
                      action.callback(data);
                      callback();
                    }} 
                  />
                ) : action.name === "Update" ? (
                  <UpdateFoodDialog
                    key={`${index}-UpdateDialog`} 
                    title={action.title}
                    description={action.description}
                    selected={selected} 
                    selectedDetail={selectedDetail}
                    showDialog={showUpdate}
                    setShowDialog={setShowUpdate}
                    statusOpts={statusOpts}
                    fields={action.fields}
                    callbackFn={(data) => {
                      action.callback(data);
                      callback();
                    }}
                  />
                ) : null
              }
            </React.Fragment>
          )
        }
      );
      return items;
    };
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },

          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}
        {numSelected > 0 ? (
            getToolbarActions(selectedToolbarActions, selected)
          ) : (
            getToolbarActions(toolbarActions, selected)
          )
        }
      </Toolbar>
    );
  }
  
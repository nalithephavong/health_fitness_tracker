import { useState, useEffect } from "react";
import { 
    Container,
    Paper 
} from "@mui/material";

import Layout from "@/layouts/layout";
import CustomTable from "@/components/CustomTable";
import { 
    RowType, 
    HeaderCellType, 
    ToolbarActions, 
    UpdateType, 
    StatusType 
} from "@/templates/Interfaces";
import { AppConfig } from "@/templates/AppConfig";

type SectionType = {
    label: string;
    id: string;
}

type DataType = {
    breakfast: RowType[];
    lunch: RowType[];
    dinner: RowType[];
    snack1: RowType[];
    snack2: RowType[];
    snack3: RowType[];
};

const tableHeader: HeaderCellType[] = [
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'serving',
        numeric: true,
        disablePadding: false,
        label: 'Serving',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
];

const ordersToolbarActions: ToolbarActions[] = [
    {
      name: "Add",
      title: "Add New Food",
      description: "Meal: ",
      icon: "AddIcon",
      fields: [],
      callback: (param) => {
        fetch(`${AppConfig.apiUrl}/health`, { 
            method:"POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(param)
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            console.log(json); 
        })
        .catch((err:Error) => {
            console.error(err);
        });
      },
      tooltip: "Add new food"
    }
  ];
  
const ordersSelectedToolbarActions: ToolbarActions[] = [
    {
        name: "Update",
        title: "Update Food",
        description: "Update the following item(s):",
        icon: "UpdateIcon",
        fields: [
            { id: "amount", label: "Amount", type: "number" },
            { id: "serving", label: "Serving", type: "text" },
            { id: "calories", label: "Calories", type: "number" }
        ],
        callback: (param) => {
            const { data, selected } = param as UpdateType;
            selected.forEach((id) => { 
                fetch(`${AppConfig.apiUrl}/health/${id}`, { 
                    method:"PATCH",
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify(data)
                })
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    console.log(json); 
                })
                .catch((err:Error) => {
                    console.error(err);
                });
            });
        },
        tooltip: "Update item(s)"
    },
    {
        name: "Delete",
        title: "Delete Food",
        description: "Delete the following item(s):",
        icon: "DeleteIcon",
        fields: [],
        callback: (param) => { 
            (param as string[]).forEach((id) => {
              fetch(`${AppConfig.apiUrl}/health/${id}`, { method:"DELETE" })
              .then((res) => {
                return res.json();
              })
              .then((json) => {
                console.log(json); 
              })
              .catch((err:Error) => {
                console.error(err);
              });
            });
        },
        tooltip: "Delete item"
    }
];

const ordersStatusTypes:StatusType[] = [
    {
        id: "Logged",
        label: "Logged",
        color: "success"
    },
    {
        id: "Planned",
        label: "Planned",
        color: "info"
    },
];

const tableSections: SectionType[] = [
    { label: "Breakfast", id: "breakfast" },
    { label: "Lunch", id: "lunch" },
    { label: "Dinner", id: "dinner" },
    { label: "Snack 1", id: "snack1" },
    { label: "Snack 2", id: "snack2" },
    { label: "Snack 3", id: "snack3" }
];

export default function Food () {
    const [data, setData] = useState<DataType | null>(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(`${AppConfig.apiUrl}/health`)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const records = json.records as DataType;
          setData(records); 
          setRefresh(false);
        })
        .catch((err:Error) => {
          console.error(err);
          setRefresh(false);
        });
      }, [refresh]);

    const getTableSection = (data: DataType) => {
        const items = tableSections.map((table) => {
            return (
                <Paper sx={{ mx: 5 }} key={table.id}>
                    <CustomTable
                        tableID={table.id} 
                        tableTitle={table.label}
                        rows={data[table.id as keyof DataType]}
                        headerCells={tableHeader}
                        toolbarActions={ordersToolbarActions}
                        selectedToolbarActions={ordersSelectedToolbarActions}
                        defaultOrderBy="id"
                        statusOpts={ordersStatusTypes}
                        componentCallback={() => {setRefresh(true);}}
                        dense={false}
                    />
                </Paper>
            )
        });
        return items;
    };

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <Layout title="Dashboard">
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                { getTableSection(data) }
            </Container>
        </Layout>
    )
}
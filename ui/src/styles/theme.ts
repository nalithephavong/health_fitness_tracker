import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
    palette: {
        primary: {
          main: "#6EB6EC"
        },
        secondary: {
            main: "#D4D4D4"
        },
        warning: {
            main: "#EEA948",
        },
        success: {
            main: "#C5EA87"
        },
        error: {
            main: "#ffa99f"
        },
        info: {
            main: "#89dcfb"
        }
      },
});

export default defaultTheme;
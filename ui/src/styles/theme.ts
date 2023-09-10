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
            main: "#f9cb99",
        },
        success: {
            main: "#89dcfb"
        },
        error: {
            main: "#ffa99f"
        },
        info: {
            main: "#f0efda"
        }
      },
});

export default defaultTheme;
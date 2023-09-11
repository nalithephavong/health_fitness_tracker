import { Typography, Link } from "@mui/material";
import { AppConfig } from "../templates/AppConfig";

export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          {AppConfig.title}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        {' Made with ♡ by '}
        <Link color="inherit" href="http://www.everywhensoftware.com">
         Everywhen Software
        </Link>
        {'.'}
      </Typography>
    );
  }
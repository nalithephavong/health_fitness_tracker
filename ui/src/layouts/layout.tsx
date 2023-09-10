import * as React from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider } from '@mui/material/styles';
import { 
    CssBaseline,
    Box
} from '@mui/material';
import NavigationBar from '@/components/NavigationBar';
import Copyright from '@/components/Copyright';
import defaultTheme from '@/styles/theme';
import { AppConfig } from '@/templates/AppConfig';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function Layout(props:LayoutProps) {
    return (
        <>
            <Helmet title={`${props.title} | ${AppConfig.title}`} />
            <ThemeProvider theme={defaultTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <NavigationBar />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                            marginTop: 8
                        }}
                    >
                        {props.children}
                        <Copyright />
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}
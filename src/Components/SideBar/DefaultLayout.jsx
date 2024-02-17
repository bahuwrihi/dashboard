import React from 'react';
import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "./sidebarContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import sent_praise_count from '../Header/header';
import Header from '../Header/header';
const DefaultLayout = ({ children }) => {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MyProSidebarProvider>
                    <div style={{ height: "100vh", width: "100%", overflowY: "scroll" }}>
                        <Header />
                        <main
                            style={{ padding: "1rem 3rem" }}>
                            {children}
                        </main>
                    </div>
                </MyProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default DefaultLayout;

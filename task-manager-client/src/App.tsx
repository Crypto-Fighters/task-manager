import React, {useEffect} from 'react';
import './App.css';
import createCache from '@emotion/cache';
import { TssCacheProvider } from 'tss-react';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignInSide } from './modules/auth';
import {useSelector} from "react-redux";
import {currentUserSelector} from "./modules/auth/selectors";
import {Main} from "./modules/main";
import {useNavigate, useRoutes} from "react-router-dom";

const ThemeRoutes = [
    {
        path: "/login",
        element: <SignInSide />,
    },
    {
        path: "/dashboard*",
        element: <Main />,
    },
];

const theme = createTheme();

const cache = createCache({
    key: `app-css`,
    prepend: true,
});

const tssCache = createCache({
    key: `app-tss`,
});

function App() {
    const user = useSelector(currentUserSelector);
    const routing = useRoutes(ThemeRoutes);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
        else navigate("/login");
    }, [user])

    return (
      <CacheProvider value={cache}>
          <TssCacheProvider value={tssCache}>
              <ThemeProvider theme={theme}>
                  {routing}
              </ThemeProvider>
          </TssCacheProvider>
      </CacheProvider>
    );
}

export default App;

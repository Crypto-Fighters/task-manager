import React from 'react';
import './App.css';
import {TodoRoot} from "./modules/todo";
import createCache from '@emotion/cache';
import { TssCacheProvider } from 'tss-react';
import { CacheProvider } from '@emotion/react';

const cache = createCache({
    key: `app-css`,
    prepend: true,
});

const tssCache = createCache({
    key: `app-tss`,
});

function App() {
  return (
      <CacheProvider value={cache}>
          <TssCacheProvider value={tssCache}>
            <TodoRoot/>
          </TssCacheProvider>
      </CacheProvider>
  );
}

export default App;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './components/Main';
import { ChakraProvider } from '@chakra-ui/react';

import { Web3ContextProvider } from './providers/Web3ContextProvider';

const container = document.getElementById('app-root')!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <Web3ContextProvider>
                <Main />
            </Web3ContextProvider>
        </ChakraProvider>
    </React.StrictMode>
);
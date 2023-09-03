import React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './components/Main';
import { ChakraProvider } from '@chakra-ui/react';

const container = document.getElementById('app-root')!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <Main />
        </ChakraProvider>
    </React.StrictMode>
);
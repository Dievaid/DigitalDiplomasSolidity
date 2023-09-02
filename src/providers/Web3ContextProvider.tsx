import { Web3ReactHooks, Web3ReactProvider, initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { Connector, Web3ReactStore } from '@web3-react/types';
import React from 'react';

const connectors: [Connector, Web3ReactHooks, Web3ReactStore][] = [
    initializeConnector<MetaMask>((actions) => new MetaMask({actions})),
    initializeConnector<Network>((actions) => new Network({actions, urlMap: {
        1337 : "http://127.0.0.1:7545"
    }, defaultChainId: 1337})),
];

export const Web3ContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Web3ReactProvider
            connectors={connectors}>
            {children}
        </Web3ReactProvider>
    );
}
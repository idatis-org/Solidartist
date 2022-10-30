import { createContext, useContext } from 'react';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
// import { Avalanche } from 'avalanche';
import Web3 from "web3";

// const Web3ConnectionContext = createContext({ connector: Avalanche })({});

// export function Web3ConnectionContextProvider({ children }) {
//     const [connector, hooks] = initializeConnector(
//         (actions) => new Avalanche(actions, true)
//     );

//     return (
//         <Web3ConnectionContext.Provider
//             value={{
//                 connector,
//                 ...hooks,
//             }}
//         >
//             {children}
//         </Web3ConnectionContext.Provider>
//     );
// }

// export function useWeb3ConnectionContext() {
//     return useContext(Web3ConnectionContext);
// }
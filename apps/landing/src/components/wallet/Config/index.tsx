import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

export const injected = new InjectedConnector({
    supportedChainIds: process.env.METAMASK_SUPPORTED_CHAINS?.split(",").map((chainId) => parseInt(chainId)),
})

const walletconnect = new WalletConnectConnector({
    //rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`, 
    bridge: "https://bridge.walletconnect.org",
    qrcode: true
});

const walletlink = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "web3-react-demo"
});

export const connectors = {
    injected: injected,
    walletConnect: walletconnect,
    coinbaseWallet: walletlink
};
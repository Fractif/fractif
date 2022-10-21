import { Button, Stack } from '@mantine/core';
import { useWeb3React } from "@web3-react/core";
import { MetamaskIcon, WalletConnectIcon, CoinbaseWalletIcon } from '@components/icons'
import { connectors } from "@components/wallet/config";

const providers = [
    { name: 'Metamask', connectorWallet: connectors.injected, provider: "injected", icon: <MetamaskIcon width={25} height={25} /> },
    { name: 'Wallet Connect', connectorWallet: connectors.walletConnect, provider: "coinbaseWallet", icon: <WalletConnectIcon width={25} height={25} /> },
    { name: 'Coinbase Connect', connectorWallet: connectors.coinbaseWallet, provider: "walletConnect", icon: <CoinbaseWalletIcon width={25} height={25} /> },
]

export default function WalletConnectButtonGroup() {
    const { activate } = useWeb3React();

    const setProvider = (type: any) => {
        window.localStorage.setItem("provider", type);
    };
    return (
        <>
            <Stack>
                {providers.map(({ name, connectorWallet, provider, icon }) => (
                    <Button
                        leftIcon={icon}
                        size="md"
                        variant="default"
                        onClick={() => {
                            activate(connectorWallet);
                            setProvider(provider);
                        }}
                        styles={(theme) => ({
                            root: {
                                display: "flex",
                                fontSize: "16px",
                                fontWeight: 600,
                                height: "50px",
                                borderRadius: theme.radius.md,
                            },
                        })}
                    >
                        {name}
                    </Button>
                ))}
            </Stack>
        </>
    );
}
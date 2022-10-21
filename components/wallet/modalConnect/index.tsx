import { useState } from 'react';
import { Modal, Button, Stack, Text } from '@mantine/core';
import { useWeb3React } from "@web3-react/core";

//Wallet components
import WalletConnectButtonGroup from '../walletConnectButtonGroup';
import WalletWarningTab from '../walletWarningTab';

export default function SelectWalletModal() {
    const [opened, setOpened] = useState(false);
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Select Wallet"
                overlayOpacity={0.55}
                overlayBlur={0.3}
                size="md"
                sx={(theme) => ({
                    fontWeight: 600,
                    fontSize: 16,
                })}
            >
                <Stack>
                    <WalletConnectButtonGroup />
                    <WalletWarningTab />
                </Stack>
            </Modal>
            <Button size="md" onClick={() =>  active ? undefined : setOpened(true)}>
                {active ?
                <Text>
                    {account ? account.slice(0, 6) + "..." + account.slice(account.length - 4, account.length) : "Connect"}
                </Text>
                    :
                    "Connect Wallet"
                }
            </Button>
        </>
    );
}
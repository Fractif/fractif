import { useState } from 'react';
import { Modal, Button, Stack } from '@mantine/core';

//Wallet components
import WalletConnectButtonGroup from '../walletConnectButtonGroup';
import WalletWarningTab from '../walletWarningTab';

export default function SelectWalletModal() {
    const [opened, setOpened] = useState(false);

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
            <Button size="md" onClick={() => setOpened(true)}>
                Connect Wallet
            </Button>
        </>
    );
}
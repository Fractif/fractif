import { Box } from '@mantine/core';
import { TERM_AND_SERVICES_URL, DISCLAIMER_URL } from '@constants/index';

export default function WalletWarningTab() {
    return (
        <>
            <Box
                sx={(theme) => ({

                    //Positioning
                    textAlign: 'center',
                    padding: theme.spacing.lg,

                    //Color
                    backgroundColor: theme.colors.gray[0],
                    color: theme.colors.gray[8],

                    //Border
                    borderRadius: theme.radius.md,
                    border: 'solid',
                    borderBlockWidth: 1,
                    borderColor: theme.colors.gray[3],

                    //Font
                    fontWeight: 450,
                    fontSize: 12,
                    lineHeight: 1.2,
                })}
            >
                By connecting a wallet, you agree to Fractif
                &nbsp;
                <a target="_blank" rel="noopener noreferrer" href={TERM_AND_SERVICES_URL} style={{ color: "#4b82fb" }}>Terms of Service</a>
                &nbsp;
                and acknowledge that you have read and understand the Fractif
                &nbsp;
                <a target="_blank" rel="noopener noreferrer" href={DISCLAIMER_URL} style={{ color: "#4b82fb" }}>Protocol Disclaimer</a>.
            </Box>
        </>
    );
}
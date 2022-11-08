'use client'
import {
    createStyles,
    Header,
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    Container
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SelectWalletModal from '@components/wallet/modalConnect';

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: "#FFFFFF00",
        borderBottom : '0px',
    },
    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

export default function Navbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    return (
        <Container p={0}>
            <Header height={60} px="md" className={classes.header}>
                <Group position="apart" sx={{ height: '100%' }}>
                    Logo
                    <Group className={classes.hiddenMobile}>
                        <SelectWalletModal />
                    </Group>
                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        <SelectWalletModal />
                    </Group>
                </ScrollArea>
            </Drawer>
        </Container>
    );
}
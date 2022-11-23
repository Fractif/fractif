'use client'
import {
    Header,
    Group,
    Divider,
    Burger,
    Drawer,
    ScrollArea,
    Container
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useDisclosure } from '@mantine/hooks';
import SelectWalletModal from '@components/wallet/modalConnect';
import { useStyles } from './index.style';


export default function Navbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const { width } = useViewportSize();

    return (
        <Container pb={0}>
            <Header height={60} px="md" className={classes.header}>
                <Group position="apart" sx={{ height: '100%' }}>
                    Logo
                    {
                        width > theme.breakpoints.sm ?
                            <Group>
                                <SelectWalletModal />
                            </Group> :
                            <Burger opened={drawerOpened} onClick={toggleDrawer} />
                    }
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
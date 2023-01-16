'use client'
import {
    Header,
    Group,
    Divider,
    Burger,
    Drawer,
    ScrollArea,
    Container,
    Text,
    Stack
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useDisclosure } from '@mantine/hooks';
import { useStyles } from './index.style';

const NavbarLink = ({ children, href , closeDrawer}: { children: React.ReactNode; href: string; closeDrawer: () => void }) => {
    const { classes } = useStyles();
    return (
        <a href={href} className={classes.navlink} onClick={closeDrawer}>
            <Text>{children}</Text>
        </a>
    )
}

const NavbarLinks = ({closeDrawer}: {closeDrawer: () => void}) => (
    <>
        <NavbarLink href="#roi-calculator" closeDrawer={closeDrawer}>ROI Calculator</NavbarLink>
        <NavbarLink href="#roadmap" closeDrawer={closeDrawer}>Roadmap</NavbarLink>
        <NavbarLink href="#team" closeDrawer={closeDrawer}>The team</NavbarLink>
        <NavbarLink href="#ama" closeDrawer={closeDrawer}>FAQ</NavbarLink>
    </>
)

export default function Navbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const { width } = useViewportSize();

    return (
        <Container pb={0}>
            <Header height={60} px="md" className={classes.header}>
                <Group position="apart" sx={{ height: '100%' }}>
                    <Text className={classes.logo}>
                        fractif<span className={classes.blueDot}>.</span>
                    </Text>
                    {
                        width > theme.breakpoints.sm ?
                            <Group>
                                <NavbarLinks closeDrawer={closeDrawer} />
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

                    <Stack pb="xl" px="md">
                        <NavbarLinks closeDrawer={closeDrawer} />
                    </Stack>
                </ScrollArea>
            </Drawer>
        </Container>
    );
}
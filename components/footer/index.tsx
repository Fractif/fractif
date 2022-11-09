import { createStyles, Text, Container, ActionIcon, Group, Image, Input, Title } from '@mantine/core';
import { IconBrandTwitter, IconBrandDiscord, IconMail, IconArrowNarrowRight } from '@tabler/icons';
import { TERM_AND_SERVICES_URL, PRIVACY_POLICY_URL, DISCORD_URL, TWITTER_URL, OPENSEA_URL } from '@constants/index';
import { OpenseaIcon } from '@components/icons';

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 40,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    footerHeader: {
        maxWidth: "100%",
        width: "100%",
        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    footerLinks: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 40,
        paddingTop: 10,
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            paddingTop: 5,
        },
    },

    links: {
        marginTop: 5,
        textDecoration: 'none',
        fontSize: 14,
        color: theme.colors.gray[6],
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
            textAlign: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: "fit-content",
        height: "fit-content",
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column-reverse',
            gap: 25
        },
    },

    social: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
        },
    },

    socialIcons: {
        marginRight: 10,
        backgroundColor: theme.colors.brand[4],
        borderRadius: 100,
        color: "white"
    },

    blueDot: {
        color: theme.colors.brand[4]
    },

    newsletterButton: {
        backgroundColor: theme.colors.brand[4],
        color: "white",
        '&:hover': {
            backgroundColor: theme.colors.brand[4],
            color: "white",
            opacity: 0.8,
        }
    },

    newsletterForm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: theme.colors.gray[4],
        borderRadius: 5,
        borderStyle: 'solid',
        padding: 4,
    },

    newsletterTitle :{
        marginBottom: 20,
    },

}));

const SocialList = [
    {
        name: 'discord',
        icon: <IconBrandDiscord size={18} stroke={1.5} />,
        link: DISCORD_URL,
    },
    {
        name: 'twitter',
        icon: <IconBrandTwitter size={18} stroke={1.5} />,
        link: TWITTER_URL,
    },
    {
        name: 'Opensea',
        icon: <OpenseaIcon width={18} height="100" />,
        link: OPENSEA_URL,
    },
];

export default function Footer() {
    const { classes } = useStyles();

    return (
        <footer className={classes.footer}>
            <Container >
                <Title className={classes.newsletterTitle}>Stay up to date<span className={classes.blueDot}>.</span></Title>
                <div className={classes.newsletterForm}>
                    <Input placeholder="Enter your email" variant="unstyled" icon={<IconMail size={18} stroke={1.5} />} />
                    <ActionIcon size="lg" className={classes.newsletterButton}>
                        <IconArrowNarrowRight size={18} stroke={1.5} />
                    </ActionIcon>
            </div>
            </Container>

            <Container className={classes.inner} p={0}>
                <div className={classes.footerHeader}>
                    <Image src="/fractif.png" alt="Fractif Logo" />
                    <div className={classes.footerLinks}>
                        <a href={PRIVACY_POLICY_URL} className={classes.links}>
                            Privacy Policy
                        </a>
                        <a href={TERM_AND_SERVICES_URL} className={classes.links}>
                            Terms & Condition
                        </a>
                    </div>
                </div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © 2022 Fractif. All rights reserved.
                </Text>
                <Group spacing={0} className={classes.social} position="right" noWrap>
                    {
                        SocialList.map((social) => (
                            <a href={social.link}>
                                <ActionIcon size="lg" className={classes.socialIcons}>
                                    {social.icon}
                                </ActionIcon>
                            </a>
                        ))
                    }
                </Group>
            </Container>
        </footer>
    );
}
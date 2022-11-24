import { Text, Container, ActionIcon, Group, Image, Input, Title } from '@mantine/core';
import { IconBrandTwitter, IconBrandDiscord, IconMail, IconArrowNarrowRight } from '@tabler/icons';
import { TERM_AND_SERVICES_URL, PRIVACY_POLICY_URL, DISCORD_URL, TWITTER_URL, OPENSEA_URL } from '@constants/index';
import { OpenseaIcon } from '@components/icons';
import { useStyles } from './index.style';

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
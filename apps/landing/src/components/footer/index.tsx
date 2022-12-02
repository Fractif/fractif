import { Text, Container, ActionIcon, Group, Image, Input, Title } from '@mantine/core';
import { IconBrandTwitter, IconBrandDiscord, IconMail, IconArrowNarrowRight, IconCheck, IconAlertCircle } from '@tabler/icons';
import { TERM_AND_SERVICES_URL, PRIVACY_POLICY_URL, DISCORD_URL, TWITTER_URL, OPENSEA_URL } from '@constants/index';
import { OpenseaIcon } from '@components/icons';
import { useStyles } from './index.style';
import { useForm } from "react-hook-form";
import { showNotification } from '@mantine/notifications';

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

type InputNewsletter = {
    email: string,
};

export default function Footer() {
    const { register, handleSubmit, formState: { errors } } = useForm<InputNewsletter>();
    const { classes } = useStyles();

    async function onSubmit(data: InputNewsletter) {
        try {
            const res = await fetch('/api/mailchimp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_address: data.email,
                    status: 'subscribed',
                }),
            });

            if (res.status === 200) {
                showNotification({
                    title: 'Sucessfully subscribed',
                    message: 'Hey welcome into the fractif team! 🔥',
                    color: 'green',
                    icon: <IconCheck />,
                    autoClose: true,
                })
            } else {
                showNotification({
                    title: 'Error',
                    message: 'Something went wrong',
                    color: 'red',
                    icon: <IconAlertCircle />,
                    autoClose: true,
                })
            }

        } catch (error) {
            showNotification({
                title: 'Error',
                message: 'Something went wrong',
                color: 'red',
                icon: <IconAlertCircle />,
            });
        }
    }

    return (
        <footer className={classes.footer}>
            <Container >
                <Title className={classes.newsletterTitle}>Stay up to date<span className={classes.blueDot}>.</span></Title>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.newsletterForm}>
                    <Input
                        {...register("email",
                            {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            }
                        )}
                        placeholder="Enter your email"
                        variant="unstyled"
                        icon={<IconMail size={18} stroke={1.5} />} />
                    <ActionIcon size="lg" className={classes.newsletterButton} type="submit">
                        <IconArrowNarrowRight size={18} stroke={1.5} />
                    </ActionIcon>
                </form>
                {errors.email && <span style={{ color: "red", alignSelf: "center" }}>{errors.email?.message}</span>}
            </Container>

            <Container className={classes.inner} p={0}>
                <div className={classes.footerHeader}>
                    <Text className={classes.logo}>
                        Fractif<span className={classes.blueDot}>.</span>
                    </Text>
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
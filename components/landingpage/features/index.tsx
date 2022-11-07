'use client'
import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    Box,
    ThemeIcon,
    useMantineTheme
} from '@mantine/core';


import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock, TablerIcon } from '@tabler/icons';

export const MOCKDATA = [
    {
        icon: IconGauge,
        title: 'Extreme performance',
        description:
            'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
    },
    {
        icon: IconUser,
        title: 'Privacy focused',
        description:
            'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
    },
    {
        icon: IconCookie,
        title: 'No third parties',
        description:
            'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
    },
    {
        icon: IconLock,
        title: 'Secure by default',
        description:
            'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
    },
    {
        icon: IconMessage2,
        title: '24/7 Support',
        description:
            'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
    },
];


const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: theme.colors.brand[0],
        height: "100vh",
        justifyContent: "center",
        width: "100%"
    },

    content: {
        [theme.fn.smallerThan('xs')]: {
            alignContent: "center",
            justifyContent: "center",
        },
    },
}));

export function Feature({ icon: Icon, title, description }: any) {
    const theme = useMantineTheme();
    return (
        <div>
            <ThemeIcon variant="light" size={40} radius={40}>
                <Icon size={20} stroke={1.5} />
            </ThemeIcon>
            <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
            <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                {description}
            </Text>
        </div>
    );
}

export default function Features() {
    const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);
    const { classes } = useStyles();
    return (
        <Box className={classes.container}>
            <Container>
                <div className={classes.content}>
                    <Title order={1}>The amazing Luxury tokenization  of the world here</Title>
                </div>
                {features}
            </Container>
        </Box>
    );
}
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
    ThemeIcon,
} from '@mantine/core';

//Components
import PrimaryButton from '@components/buttons/primary';
import SecondaryButton from '@components/buttons/secondary';


const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 40,
        },
    },
    subtitle: {
        color: theme.colors.gray[8],
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.colors.brand[4] }).background,
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));

export default function Hero() {
    const { classes } = useStyles();
    return (
        <Container>
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>

                        Discover Invest ,& Sell  Extroaridinary Luxury Assets
                    </Title>
                    <Text color="dimmed" mt="md" className={classes.subtitle} >
                        The Leading luxury tokenization objects on Ethereum
                        Invest in part of items and get awesome ROI.
                    </Text>

                    <Group mt={30}>

                        <SecondaryButton title={"Discover"} />
                        <PrimaryButton title={"Invest"} />

                    </Group>
                </div>
                <Image src="/hero.svg" className={classes.image} />
            </div>
        </Container>
    );
}
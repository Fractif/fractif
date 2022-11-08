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
import { useViewportSize } from '@mantine/hooks';
//Components
import PrimaryButton from '@components/buttons/primary';
import SecondaryButton from '@components/buttons/secondary';


const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        alignItems: "left",

        [theme.fn.smallerThan('md')]: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
    },

    groupButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        width: "100%",

        [theme.fn.smallerThan('sm')]: {
            justifyContent: "center",
            alignContent: "center",
        },
        [theme.fn.smallerThan('lg')]: {
            justifyContent: "left",
        },
    },

    title: {
        fontSize: 87,
        lineHeight: 0.8,
        fontWeight: 700,
        width: "100%",
        [theme.fn.smallerThan('xs')]: {
            fontSize: 35,
        },
        [theme.fn.smallerThan('lg')]: {
            fontSize: 55,
        },
    },

    TitleColor: {
        color: theme.colors.brand[4],
    },
    
    subtitle: {
        color: theme.colors.gray[8],
        fontSize: 20,
    },

    image: {
        height: "100%",
        width: "100%",
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

}));

export default function Hero() {
    const { height, width } = useViewportSize();
    const { classes } = useStyles();
    return (
        <div>
        <Container>
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>
                        Discover Invest ,& Sell  <div className={classes.TitleColor}>Extroaridinary</div> Luxury Assets
                    </Title>
                    <Text color="dimmed" mt="md" className={classes.subtitle} >
                        The Leading luxury tokenization objects on Ethereum
                        Invest in part of items and get awesome ROI.
                    </Text>
                    <Group mt={30} className={classes.groupButton}>
                        <SecondaryButton title={"Discover"} />
                        <PrimaryButton title={"Invest"} />
                    </Group>
                </div>
                <Image src="/hero.png" className={classes.image} />
            </div>
        </Container>
        </div>
    );
}
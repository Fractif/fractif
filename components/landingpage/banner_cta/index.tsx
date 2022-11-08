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
import ImageDiscover from '@public/discover-image.png';
import PrimaryButton from '@components/buttons/primary';

const useStyles = createStyles((theme) => ({

    content: {
        maxWidth: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: "center",
        [theme.fn.smallerThan('lg')]: {
            flexDirection: 'column',
        },
    },

    description: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "right",
        alignItems: "end",
        textAlign: "right",
    },

    header: {
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        textAlign: "left",
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 750,
        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    subtitle:{
        [theme.fn.smallerThan('lg')]: {
            maxWidth: "60%",
        },
        [theme.fn.smallerThan('md')]: {
            maxWidth: "100%",
        },
    },

    title:{
        [theme.fn.smallerThan('lg')]: {
            maxWidth: "80%",
        },
    },

    button: {
        paddingTop: theme.spacing.xl ,
        [theme.fn.smallerThan('md')]: {
            paddingTop: theme.spacing.xl,
        },
    }

}));

export default function BannerCTA() {
    const { classes } = useStyles();
    return (
        <div>
            <Container>
                    <div className={classes.content}>
                        <div className={classes.header}>
                            <Title className={classes.title}>
                                Discover, Invest, Resell
                                and collect part of luxury goods
                            </Title>
                        </div>


                        <div className={classes.description}>
                            <Text color="dimmed" mt="md" className={classes.subtitle}>
                                We carefully select luxury objects by analyzing their trend curves and collecting all purchase and sales data of the last years.
                                <br />
                                Find out which objects are most interesting for your investment objectives and the risk you are willing to take.
                            </Text>
                            <div className={classes.button}>
                                <PrimaryButton title={"Discover"} />
                            </div>
                        </div>

                    </div>
            </Container>
        </div>
    );
}
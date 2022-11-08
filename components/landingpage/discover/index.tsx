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
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl ,
        paddingBottom: theme.spacing.xl ,
        [theme.fn.smallerThan('md')]: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        },
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
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 750,
        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    imageDesktop: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },
    imageMobile: {
        flex: 1,
        maxWidth: "100%",
        padding: theme.spacing.xl * 2,
        [theme.fn.largerThan('md')]: {
            display: 'none',
        },
    },
    button:{
        paddingTop: theme.spacing.xl * 2,
        [theme.fn.smallerThan('md')]: {
            paddingTop: theme.spacing.xl,
        },
    }

}));

export default function Discover() {
    const { classes } = useStyles();
    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <Image src={ImageDiscover.src} className={classes.imageDesktop} />

                    <div className={classes.content}>

                        <Title className={classes.title}>
                            Discover luxury items in trend.
                        </Title>
                        <Image src={ImageDiscover.src} className={classes.imageMobile} />

                        <Text color="dimmed" mt="md">
                            We carefully select luxury objects by analyzing their trend curves and collecting all purchase and sales data of the last years.
                            <br/>
                            Find out which objects are most interesting for your investment objectives and the risk you are willing to take.
                        </Text>
                        <div className={classes.button}>
                        <PrimaryButton title={"Sign Up now"} />
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
}
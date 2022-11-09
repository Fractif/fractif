import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
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
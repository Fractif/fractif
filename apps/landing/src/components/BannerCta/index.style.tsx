import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({

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
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
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

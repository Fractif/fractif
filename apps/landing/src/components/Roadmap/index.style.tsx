import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.colors.brand[0],
    },

    title: {
        fontSize: 87,
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: theme.spacing.md,
        [theme.fn.smallerThan('md')]: {
            fontSize: 45,
        },
    },
    subtitle:{
        [theme.fn.smallerThan('md')]: {
            fontSize: 12,
        },
    },
    blueDot: {
        color: theme.colors.brand[4]
    },

    containerTitle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
    },

    cards:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    teamCard: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
    },

    image: {
        width: "100%",
        height: "100%",
    },
}));
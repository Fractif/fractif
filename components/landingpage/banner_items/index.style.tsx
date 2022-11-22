import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    containerWrapper:{
        maxWidth: "1800px",
        margin : "0 auto",
        display: "flex",
        flexDirection: "column",
    },
    card: {
        backgroundColor: theme.colors.brand[0],
        border: 0,
        height: "120px",
        width: "330px",
        minHeight: "120px",
        minWidth: "330px",
    },

    cardWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing.xs,
        [theme.fn.smallerThan('md')]: {
            gap: theme.spacing.xs,
        },
    },

    cardHeader: {
        color: theme.colors.sucess[2],
        display: "flex",
        justifyContent: "right",
        height: "25px", 
    },

    cardTitle: {
        fontWeight: 600,
        fontSize: 22,
        lineHeight: 1,
    },
    cardDescription: {
        fontWeight: 500,
        color: theme.colors.sucess[2]
    },
    cardImage: {
    },
    cardData: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        [theme.fn.smallerThan('md')]: {
            gap: theme.spacing.xs,
        },
    },
    cardFirstRow: {
        display: 'flex',
        flexDirection: "row",
        gap: theme.spacing.xl,
        justifyContent: "start",
        whiteSpace: "nowrap",
        overflowX: 'hidden',
        [theme.fn.smallerThan('md')]: {
            gap: theme.spacing.md,
        },
    },
    cardSecondRow: {
        display: 'flex',
        flexDirection: "row",
        gap: theme.spacing.xl,
        justifyContent: "end",
        whiteSpace: "nowrap",
        overflowX: 'hidden',
        [theme.fn.smallerThan('md')]: {
            gap: theme.spacing.md,
        },
    }
}));
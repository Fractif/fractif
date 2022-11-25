import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.colors.brand[0],
    },

    title: {
        fontSize: 26,
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: theme.spacing.md,
    },

    featureDescription: {
        alignContent: "top",
        [theme.fn.smallerThan('xs')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'left',
        },
    },

    featureCard: {
        display: 'flex',
        justifyContent: 'left',
        gap: 10,
        [theme.fn.smallerThan('xs')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
        },
    }

}));
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: "#FFFFFF00",
        borderBottom : '0px',
    },
    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
    logo:{
        fontSize: 32,
        fontWeight: 700,
    },
    blueDot: {
        color: theme.colors.brand[4]
    },
    navlink: {
        color: theme.colors.gray[7],
        textDecoration: 'none',
        '&:hover': {
            color: theme.colors.gray[8],
        },
    }
}));
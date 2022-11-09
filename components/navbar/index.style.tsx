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
}));
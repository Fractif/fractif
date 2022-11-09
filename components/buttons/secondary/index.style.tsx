import {
    createStyles,
} from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    secondary: {
        borderRadius: 5,
        borderColor: theme.colors.brand[4],
        borderWidth: 2,
        color: theme.colors.brand[4],
        width: "210px",
        height: "52px",
        fontSize: 20,

        [theme.fn.smallerThan('xs')]: {
            flex: 1,
            fontSize: 16,
            height: "40px",
            width: "135px"
        },
        [theme.fn.smallerThan('lg')]: {
            fontSize: 18,
            height: "40px",
            width: "170px"
        },
    },
}));


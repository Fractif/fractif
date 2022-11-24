import {
    createStyles,
} from '@mantine/core';
import { FractifUiTheme } from '../../../theme';


export const useStyles = createStyles((theme) => ({
    primary: {
        backgroundColor: FractifUiTheme.colors.brand[4],
        borderRadius: 5,
        width: "310",
        height: "52px",
        fontWeight: 500,
        fontSize: 20,

        [theme.fn.smallerThan('xs')]: {
            flex: 1,
            fontSize: 16,
            height: "40px",
            width: "310px"
        },
        [theme.fn.smallerThan('lg')]: {
            fontSize: 18,
            height: "40px",
            width: "310px"
        },
    },
}));

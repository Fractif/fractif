import {
    createStyles,
    Button,
} from '@mantine/core';

import { IconBrandDiscord } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    primary: {
        backgroundColor: theme.colors.brand[4],
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

export default function DiscordButton() {
    const { classes } = useStyles();
    return (
        <Button className={classes.primary} leftIcon={<IconBrandDiscord />}>
            Join us on discord
        </Button>
    );
}
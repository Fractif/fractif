import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    secondary: {
        borderRadius: 10,
        borderColor: theme.colors.brand[4],
        borderWidth: 2,
        color: theme.colors.brand[4],
        width: "210px",
        height: "62px",
        fontSize: 24,

        [theme.fn.smallerThan('xs')]: {
            flex: 1,
            fontSize: 16,
            height: 40,
            width: "140px"
        },
        [theme.fn.smallerThan('lg')]: {
            fontSize: 20,
            height: 40,
            width: "180px"
        },
    },
}));

export default function SecondaryButton({title = "Secondary Button"}: {title: string}) {
    const { classes } = useStyles();
    return (
        <Button className={classes.secondary} variant="default">
            {title}
        </Button>
    );
}
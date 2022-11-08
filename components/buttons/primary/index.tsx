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
    primary: {
        backgroundColor: theme.colors.brand[4],
        borderRadius: 10,
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

export default function PrimaryButton({title = "Primary Button"}: {title: string}) {
    const { classes } = useStyles();
    return (
        <Button className={classes.primary}>
            {title}
        </Button>
    );
}
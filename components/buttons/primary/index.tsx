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
        height: "52px",
        fontSize: 20,

        [theme.fn.smallerThan('xs')]: {
            flex: 1,
            fontSize: 16,
            height: "40px",
            width: "140px"
        },
        [theme.fn.smallerThan('lg')]: {
            fontSize: 18,
            height: "40px",
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
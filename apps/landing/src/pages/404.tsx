import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colors.brand[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },
}));

export default function NotFoundTitle() {
    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Group position="center">
                <Button component="a" href="/" variant="subtle" size="md" >
                Take me back to home page
                </Button>
            </Group>
        </Container>
    );
}
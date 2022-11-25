import {
    Button,
} from '@mantine/core';
import { useStyles } from './index.style';

export function SecondaryButton({title = "Secondary Button"}: {title: string}) {
    const { classes } = useStyles();
    return (
        <Button className={classes.secondary} variant="default">
            {title}
        </Button>
    );
}
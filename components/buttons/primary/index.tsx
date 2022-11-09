import {
    Button,
} from '@mantine/core';
import { useStyles } from './index.style';

export default function PrimaryButton({title = "Primary Button"}: {title: string}) {
    const { classes } = useStyles();
    return (
        <Button className={classes.primary}>
            {title}
        </Button>
    );
}
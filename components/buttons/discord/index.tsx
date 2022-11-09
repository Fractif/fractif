import {
    Button,
} from '@mantine/core';
import { IconBrandDiscord } from '@tabler/icons';
import { useStyles } from './index.style';

export default function DiscordButton() {
    const { classes } = useStyles();
    return (
        <Button className={classes.primary} leftIcon={<IconBrandDiscord />}>
            Join us on discord
        </Button>
    );
}
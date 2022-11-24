import {
    Container,
    Title,
    Text,
} from '@mantine/core';
import { PrimaryButton } from 'fractif-ui';
import { useStyles } from './index.style';

export default function BannerCTA() {
    const { classes } = useStyles();
    return (
        <div>
            <Container>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <Title className={classes.title}>
                            Discover, Invest, Resell
                            and collect part of luxury goods
                        </Title>
                    </div>


                    <div className={classes.description}>
                        <Text color="dimmed" mt="md" className={classes.subtitle}>
                            Have access to incredible objects that you would not have had access to without Fractif.
                        </Text>
                        <div className={classes.button}>
                            <PrimaryButton title={"Discover"} />
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
}
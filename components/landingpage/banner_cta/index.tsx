import {
    Container,
    Title,
    Text,
} from '@mantine/core';
import PrimaryButton from '@components/buttons/primary';
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
                                We carefully select luxury objects by analyzing their trend curves and collecting all purchase and sales data of the last years.
                                <br />
                                Find out which objects are most interesting for your investment objectives and the risk you are willing to take.
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
'use client'
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
import { useStyles } from './index.style';

//Components
import PrimaryButton from '@components/buttons/primary';
import SecondaryButton from '@components/buttons/secondary';

export default function Hero() {
    const { classes } = useStyles();
    return (
        <div>
        <Container>
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>
                        Discover Invest ,& Sell  <div className={classes.TitleColor}>Extroaridinary</div> Luxury Assets
                    </Title>
                    <Text color="dimmed" mt="md" className={classes.subtitle} >
                        The Leading luxury tokenization objects on Ethereum
                        Invest in part of items and get awesome ROI.
                    </Text>
                    <Group mt={30} className={classes.groupButton}>
                        <SecondaryButton title={"Discover"} />
                        <PrimaryButton title={"Invest"} />
                    </Group>
                </div>
                <Image src="/hero.png" className={classes.image} />
            </div>
        </Container>
        </div>
    );
}
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
import { PrimaryButton, SecondaryButton } from 'fractif-ui';

export default function Hero() {
    const { classes } = useStyles();
    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            The right way to invest in  <span className={classes.TitleColor}>luxury.</span>
                        </Title>
                        <Text color="dimmed" mt="md" className={classes.subtitle} >
                            Collect tokens tied to luxury assets on Ethereum.
                            Invest in fractions of luxury goods and diversify your portfolio.
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
import {
    createStyles,
    Image,
    Container,
    Title,
    Text,
} from '@mantine/core';
import ImageDiscover from '@public/discover-image.png';
import PrimaryButton from '@components/buttons/primary';
import { useStyles } from './index.style';

export default function Discover() {
    const { classes } = useStyles();
    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <Image src={ImageDiscover.src} className={classes.imageDesktop} />

                    <div className={classes.content}>

                        <Title className={classes.title}>
                            Discover luxury items in trend.
                        </Title>
                        <Image src={ImageDiscover.src} className={classes.imageMobile} />

                        <Text color="dimmed" mt="md">
                            We carefully select luxury objects by analyzing their trend curves and collecting all purchase and sales data of the last years.
                            <br/>
                            Find out which objects are most interesting for your investment objectives and the risk you are willing to take.
                        </Text>
                        <div className={classes.button}>
                        <PrimaryButton title={"Sign Up now"} />
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
}
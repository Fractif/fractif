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
                            Invest in luxury, the best performing class of assets
                        </Title>
                        <Image src={ImageDiscover.src} className={classes.imageMobile} />

                        <Text color="dimmed" mt="md">

                            Diversifying your portfolio haven’t been more essential than today. 
                            <br/>
                            It turns out that luxury assets have proven to be really good investments for quite a few years and the tendency seems to continue. 
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
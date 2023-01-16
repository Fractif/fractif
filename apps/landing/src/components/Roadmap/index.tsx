'use client'
import { Title, Text, Image, Container } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useStyles } from './index.style';
import { ROADMAP_URL } from '@constants/index';

export default function Roadmap() {
    const { classes, theme } = useStyles();
    const { width } = useViewportSize();
    return (
        <>
            <div className={classes.wrapper}>
                <Container className={classes.containerTitle}>
                    <Title className={classes.title}>ROADMAP<span className={classes.blueDot}>.</span></Title>
                    <Text className={classes.subtitle}>Detailled roadmap can be found <a href={ROADMAP_URL} style={{fontWeight:800, textDecoration: "none", color:"black"}}>here</a></Text>
                </Container>
            </div>
            {
                width > theme.breakpoints.md ?
                    <Container>
                        <Image src={"./roadmap-desktop.svg"} alt="roadmap" />
                    </Container>
                    :
                    <Container>
                        <Image src={"./roadmap-mobile.svg"} alt="roadmap" />
                    </Container>
            }
        </>
    );
}
'use client'
import { Title, Image, Container } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useStyles } from './index.style';

const TeamList = [
    {
        name: 'Anthony',
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1039530920086093864/1628083736914_1.png",
        job: 'Founder & CTO',
    },
    {
        name: 'Tom',
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1039530920086093864/1628083736914_1.png",
        job: 'Founder & Strategist',
    },
    {
        name: 'Téo',
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1039530920086093864/1628083736914_1.png",
        job: 'Founder & CTO',
    },
];

export default function Roadmap() {
    const { classes, theme } = useStyles();
    const { width } = useViewportSize();
    return (
        <>
            <div className={classes.wrapper}>
                <Container className={classes.containerTitle}>
                    <Title className={classes.title}>ROADMAP<span className={classes.blueDot}>.</span></Title>
                </Container>
            </div>
            {
                width > theme.breakpoints.md ?
                    <Container >
                        <Image src={"./roadmap-desktop.svg"} alt="roadmap" />
                    </Container>
                    :
                    <Container >
                        <Image src={"./roadmap-mobile.svg"} alt="roadmap" />
                    </Container>
            }
        </>
    );
}
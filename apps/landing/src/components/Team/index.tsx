'use client'
import { Title, SimpleGrid, Text, Image, Box, Container } from '@mantine/core';
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

export default function Team() {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.wrapper}>
                <Container className={classes.containerTitle}>
                    <Title className={classes.title}>THE TEAM<span className={classes.blueDot}>.</span></Title>
                </Container>
            </div>

            <Container className={classes.cards}>
                <SimpleGrid cols={3} spacing={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>

                    {
                        TeamList.map((item, index) => (
                            <Box key={index} className={classes.teamCard}>
                                <Image className={classes.image} src={item.image} alt={item.name} />
                                <Title>{item.name}<span className={classes.blueDot}>.</span></Title>
                                <Text>{item.job}</Text>
                            </Box>
                        ))
                    }
                </SimpleGrid>
            </Container>

        </>
    );
}
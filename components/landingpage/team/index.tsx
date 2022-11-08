'use client'
import { createStyles, Title, SimpleGrid, Text, Image, Box, Stack, Col, Container } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.colors.brand[0],
    },

    title: {
        fontSize: 87,
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: theme.spacing.md,
        [theme.fn.smallerThan('md')]: {
            fontSize: 45,
        },
    },

    blueDot: {
        color: theme.colors.brand[4]
    },

    containerTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
    },

    cards:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    teamCard: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
    },

    image: {
        width: "100%",
        height: "100%",
    },
}));


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
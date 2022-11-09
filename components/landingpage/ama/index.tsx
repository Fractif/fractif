'use client'
import { createStyles, Title, SimpleGrid, Text, Image, Box, Stack, Col, Container } from '@mantine/core';
import DiscordButton from '@components/buttons/discord';

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

    amaWrapper:{
        [theme.fn.smallerThan('xs')]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },

    },

    amaQuestion: {
        fontSize: 20,
        fontWeight: 700,
    },
    amaAnswer:{
        fontSize: 16,
    }

}));


const QuestionsList = [
    {
        question: 'How can I reset my password ',
        answer: "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon. ",
    },
    {
        question: 'Can I create more that one account ',
        answer: "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. ",
    },
    {
        question: 'How can I reset my password ',
        answer: "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon. ",
    },
    {
        question: 'Can I create more that one account ',
        answer: "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. ",
    },
];

export default function Ama() {
    const { classes } = useStyles();

    return (
        <>
            <div>

                <div className={classes.wrapper}>
                    <Container className={classes.containerTitle}>
                        <Title className={classes.title}>AMA<span className={classes.blueDot}>.</span></Title>
                    </Container>
                </div>

                <Container className={classes.amaWrapper}>
                    <div>
                        {
                            QuestionsList.map((item, index) => (
                                <Box key={index} pb="xl">
                                    <Stack dir="column" spacing="md">
                                        <Text className={classes.amaQuestion}>{item.question}<span className={classes.blueDot}>?</span></Text>
                                        <Text className={classes.amaAnswer}>{item.answer}</Text>
                                    </Stack>
                                </Box>
                            ))
                        }
                    </div>
                    <DiscordButton />
                </Container>
            </div>
        </>
    );
}
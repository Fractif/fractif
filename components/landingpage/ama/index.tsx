import { createStyles, Image, Accordion, Grid, Col, Container, Title } from '@mantine/core';
import image from '/public/faq.svg';
import DiscordButton from '@components/buttons/discord';

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
    },

    title: {
        marginBottom: theme.spacing.md,
        paddingLeft: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    item: {
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    },

    blueDot: {
        color: theme.colors.brand[4]
    },
    ctaDiscord:{
        paddingTop: theme.spacing.xl,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent:"center"
    }
}));

const Questionlist = [
    {
        key: "1",
        title: 'What’s the goal of Fractif',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi ac phasellus placerat a pellentesque tellus sed.',
    },
    {
        key: "2",
        title: 'Where can I resell my tokens',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi ac phasellus placerat a pellentesque tellus sed.',
    },
    {
        key: "3",
        title: 'How can I now the upcoming items',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi ac phasellus placerat a pellentesque tellus sed.',
    },
]
export default function Ama() {
    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <Container size="lg">
                <Grid id="faq-grid" gutter={50}>
                    <Col span={12} md={6}>
                        <Image src={image.src} alt="Frequently Asked Questions" />
                    </Col>
                    <Col span={12} md={6}>
                        <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
                            {
                                Questionlist.map((item) => (
                                    <Accordion.Item className={classes.item} value={item.key}>
                                    <Accordion.Control>{item.title} <span className={classes.blueDot}>?</span></Accordion.Control>
                                    <Accordion.Panel>{item.answer}</Accordion.Panel>
                                </Accordion.Item>
                                ))
                            }
                        </Accordion>
                        <div className={classes.ctaDiscord}>
                            <DiscordButton/>
                        </div>
                    </Col>
                </Grid>
            </Container>
        </div>
    );
}
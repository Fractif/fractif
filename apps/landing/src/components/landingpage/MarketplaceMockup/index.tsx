import { Image, Accordion, Grid, Col, Container } from '@mantine/core';
import image from '/public/faq.svg';
import { DiscordButton } from 'fractif-ui';
import { useStyles } from './index.style';

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
                            <DiscordButton />
                        </div>
                    </Col>
                </Grid>
            </Container>
        </div>
    );
}
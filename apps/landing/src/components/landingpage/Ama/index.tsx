import { Image, Accordion, Grid, Col, Container, Title } from '@mantine/core';
import image from '@public/faq.jpg';
import { DiscordButton } from 'fractif-ui';
import { useStyles } from './index.style';

const Questionlist = [
    {
        key: "1",
        title: 'What’s the goal of Fractif',
        answer: 'Take this Rolex Pepsi, if Alice wanted to buy only a fraction of it, let’s say 20$, she could either participate in the crowdsale or buy it from Bob on our marketplace.',
    },
    {
        key: "2",
        title: 'How can I purchase assets tokens',
        answer: 'Join our discord & newsletter to stay in touch and know about the upcoming assets.',
    },
    {
        key: "3",
        title: 'Where can I resell my tokens',
        answer: 'For the moment you can only resell your tokens via Opensea. Check the roadmap to be alerted of the release of Fractif marketplace.',
    },
    {
        key: "4",
        title: 'Do you sell luxury items?',
        answer: 'No. We only sell fractions of a luxury asset that was divided programmatically in X tokens.',
    },
    {
        key: "5",
        title: 'Where do you keep assets tied to the tokens?',
        answer: 'Assets are kept in bank safes. An independent custodian will publish Proof-of-Reserve each month.',
    },
]


export default function Ama() {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.wrapperbannerComponent}>
                <Container className={classes.containerBannerComponent}>
                    <Title className={classes.titleBannerComponent}>AMA<span className={classes.blueDot}>.</span></Title>
                </Container>
            </div>

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
                                            <Accordion.Control>{item.title}<span className={classes.blueDot}>?</span></Accordion.Control>
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
        </>
    );
}
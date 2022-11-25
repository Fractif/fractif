import { Dispatch, SetStateAction } from 'react';
import { Modal, Button, Group, Title, Container, Text, Input } from '@mantine/core';
import { IconMail, IconCheck } from '@tabler/icons';
import { useStyles } from './index.style';

export default function NewsletterPopUp({ opened, setOpened }: { opened: boolean, setOpened: Dispatch<SetStateAction<boolean>> }) {
    const { classes } = useStyles();

    const NewsletterPopUp = {
        title: 'Join 1,298 investors getting 1 articles every weeks',
        bulletPoints: [
            "Luxury investment analysis",
            "2 mins to read",
            "Early acess to incoming items",
            "Free, forever"
        ]
    }
    return (
        <>
                <Modal
                    centered
                    opened={opened}
                    onClose={() => setOpened(false)}
                    size={"md"}
                    withCloseButton={false}
                    transitionDuration={500}
                >
                    <Container className={classes.popupContainer}>
                        <Title className={classes.popupTitle}>
                            {NewsletterPopUp.title}
                        </Title>
                        <Group className={classes.popupGroupBulletPoint}>
                            {NewsletterPopUp.bulletPoints.slice(0, 5).map((bulletPoint) => (
                                <div className={classes.popupBulletPoint}>
                                    <IconCheck size={24} stroke={1.5} className={classes.popupCheckIcon} />
                                    <Text>
                                        {bulletPoint}
                                    </Text>
                                </div>
                            ))
                            }
                        </Group>
                        <div className={classes.popupFooter}>
                            <Input
                                icon={<IconMail />}
                                className={classes.popupInput}
                                size={"md"}
                                placeholder="example@email.com"
                            />

                            <Button className={classes.popupButton}>
                                Subscribe to our newsletter
                            </Button>
                        </div>
                    </Container>
                </Modal>
        </>
    );
}
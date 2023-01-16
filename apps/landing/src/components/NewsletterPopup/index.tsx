import { Dispatch, SetStateAction } from 'react';
import { Modal, Button, Group, Title, Container, Text, Input } from '@mantine/core';
import { IconAlertCircle, IconCheck, IconMail } from '@tabler/icons';
import { useStyles } from './index.style';
import { useForm } from "react-hook-form";
import { showNotification } from '@mantine/notifications';

type InputNewsletter = {
    email: string,
};

type INewsletterPopup ={
    opened: boolean, 
    setOpened: Dispatch<SetStateAction<boolean>>
}
export default function NewsletterPopUp({ opened, setOpened }: INewsletterPopup) {
    const { register, handleSubmit, formState: { errors } } = useForm<InputNewsletter>();
    const { classes } = useStyles();

    const NewsletterPopUp = {
        title: 'Join more than 1,298 investors getting 1 articles every weeks',
        bulletPoints: [
            "Luxury investment analysis",
            "2 mins to read",
            "Early acess to incoming items",
            "Free, forever"
        ]
    }

    async function onSubmit(data: InputNewsletter) {
        try {

            const res = await fetch('/api/mailchimp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_address: data.email,
                    status: 'subscribed',
                }),
            });

            if (res.status === 200) {
                showNotification({
                    title: 'Sucessfully subscribed',
                    message: 'Hey welcome into the fractif team! 🔥',
                    color: 'green',
                    icon: <IconCheck />,
                    autoClose: true,
                })
                setOpened(false);
            } else {
                showNotification({
                    title: 'Error',
                    message: 'Something went wrong',
                    color: 'red',
                    icon: <IconAlertCircle />,
                    autoClose: true,
            })
        }
        } catch (error) { 
            showNotification({
                title: 'Error',
                message: 'Something went wrong',
                color: 'red',
                icon: <IconAlertCircle />,
            });
        }
    }


    return (
        <>
            <Modal
                centered
                opened={opened}
                onClose={() => setOpened(false)}
                size={"md"}
                withCloseButton={true}
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
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                        <div className={classes.popupFooter}>
                            <Input
                                {...register("email",
                                    {
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    }
                                )}
                                icon={<IconMail />}
                                className={classes.popupInput}
                                size={"md"}
                                placeholder="example@email.com"
                            />
                            {errors.email && <span style={{ color: "red", alignSelf: "center" }}>{errors.email?.message}</span>}

                            <Button className={classes.popupButton} type="submit">
                                Subscribe to our newsletter
                            </Button>
                        </div>
                    </form>
                </Container>
            </Modal>
        </>
    );
}
'use client'
import { createStyles, Title, SimpleGrid, Text, Image, ThemeIcon, Grid, Col, Container } from '@mantine/core';
import { IconWallet, IconChartBar, IconCircleDotted, IconFileCode } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.colors.brand[0],
    },

    title: {
        fontSize: 26,
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: theme.spacing.md,
    },

    featureDescription: {
        alignContent: "top",
        [theme.fn.smallerThan('xs')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'left',
        },
    },

    featureCard: {
        display: 'flex',
        justifyContent: 'left',
        gap: 10,
        [theme.fn.smallerThan('xs')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
        },
    }

}));

const features = [
    {
        icon: IconWallet,
        title: 'Trade in luxury goods in few clicks.',
        description: 'With fractif invest quickly and easily thanks to our user-oriented interface.',
    },
    {
        icon: IconChartBar,
        title: 'Track your investment',
        description: 'Track all your investments with the analysis of all our token data through the blockchain.',
    },
    {
        icon: IconCircleDotted,
        title: 'No annoying focus ring',
        description:
            'With new :focus-visible selector focus ring will appear only when user navigates with keyboard.',
    },
];

export default function FeaturesTitle() {
    const { classes } = useStyles();

    const items = features.map((feature) => (
        <div key={feature.title}
            className={classes.featureCard}
        >
            <ThemeIcon
                size={44}
                radius="md"
                variant="gradient"
                gradient={{ deg: 133, from: '#0657CF', to: 'blue' }}
            >
                <feature.icon size={26} stroke={1.5} />
            </ThemeIcon>
            <div className={classes.featureDescription}>
                <Text size="lg" pt="0" weight={500} style={{ width: "100%" }}>
                    {feature.title}
                </Text>
                <Text color="dimmed" size="sm">
                    {feature.description}
                </Text>
            </div>
        </div>
    ));

    return (
        <div className={classes.wrapper}>
            <Container>
                <Grid >
                    <Col span={12} md={5} pb="xl">
                        <Title className={classes.title} order={2}>
                            This is how you invest in luxury assets.
                        </Title>
                    </Col>
                    <Col span={12}>
                        <SimpleGrid cols={3} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                            {items}
                        </SimpleGrid>
                    </Col>
                </Grid>
            </Container>
        </div>
    );
}
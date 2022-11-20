'use client'
import { Title, SimpleGrid, Text, ThemeIcon, Grid, Col, Container } from '@mantine/core';
import { IconWallet, IconChartBar, IconCircleDotted } from '@tabler/icons';
import { useStyles } from './index.style';

const features = [
    {
        icon: IconWallet,
        title: 'Assets are stored in bank safes ',
        description: 'By keeping the assets in bank safes, the Fractif Foundation will protect the assets until their sale has been decided by the tokens holders. We intend to protect the assets from theft, deterioration and other threats. A certificate of deposit will be uploaded on the IPFS for each product.',
    },
    {
        icon: IconChartBar,
        title: 'Make secure, trusty and … trades',
        description: 'Our tokens use the leading industry ERC1155 standard and can be traded on Fractif, Opensea and many other legit marketplaces.',
    },
    {
        icon: IconCircleDotted,
        title: 'Assets chosen and authenticated by professionals ',
        description:
            'We chose to work exclusively with brands and professionals to assure the authenticity of each item we will list on Fractif. A certificate of authenticity will be uploaded on the IPFS for each product.',
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
                <Text color="dimmed" size="sm" pt={"xs"}>
                    {feature.description}
                </Text>
            </div>
        </div>
    ));

    return (
        <div className={classes.wrapper}>
            <Container>
                <Grid >
                    <Col span={12} md={6} pb="xl">
                        <Title className={classes.title} order={2}>
                        Invest in secured, approved, and rare assets.
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
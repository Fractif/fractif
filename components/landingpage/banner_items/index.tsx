import {
    createStyles,
    Image,
    Text,
    Card,
    SimpleGrid,
    Center
} from '@mantine/core';

//import icon trending-up
import { IconTrendingUp } from '@tabler/icons'

//import styles
import { useStyles } from './index.style';

//import all images
import Rolex from '@public/itemBanner/Fractif_Banner_Rolex.png';
import Hermes from '@public/itemBanner/Fractif_Banner_Hermes.png';
import Ferrari from '@public/itemBanner/Fractif_Banner_Ferrari.png';
import JaegerLeCoultre from '@public/itemBanner/Fractif_Banner_JaegerLeCoultre.png';
import Porsche from '@public/itemBanner/Fractif_Banner_Porsche.png';
import PatekPhilippe from '@public/itemBanner/Fractif_Banner_PatekPhilippe.png';
import AudemarsPiguet from '@public/itemBanner/Fractif_Banner_AudemarsPiguet.png';
import VanCleef from '@public/itemBanner/Fractif_Banner_VanCleef.png';
import Macallan from '@public/itemBanner/Fractif_Banner_Macallan.png';

const ListItem = [
    {
        title: "Rolex",
        trending_percent: "+12,35%",
        image: Rolex.src
    },
    {
        title: "Hermès",
        trending_percent: "+12,35%",
        image:  Hermes.src
    },
    {
        title: "Ferrari",
        trending_percent: "+12,35%",
        image: Ferrari.src
    },
    {
        title: "Jaeger-leCoultre",
        trending_percent: "+12,35%",
        image: JaegerLeCoultre.src
    },
    {
        title: "Macallan",
        trending_percent: "+12,35%",
        image: Macallan.src
    },
    {
        title: "Patek Philippe",
        trending_percent: "+12,35%",
        image: PatekPhilippe.src
    },
    {
        title: "Audemars Piguet",
        trending_percent: "+12,35%",
        image: AudemarsPiguet.src
    },
    {
        title: "Van Cleef & Arpels",
        trending_percent: "+12,35%",
        image: VanCleef.src
    },

    {
        title: "Porsche",
        trending_percent: "+12,35%",
        image: Porsche.src
    },
 
]

function CardRendering({item} : {item: {title: string, trending_percent: string, image: string}}) {
    const { classes } = useStyles();
    return(
        <Card p="xl" radius="md" className={classes.card}>
        <Card.Section inheritPadding py="xs" className={classes.cardHeader}>
            <IconTrendingUp />
        </Card.Section>
        <div className={classes.cardWrapper}>

            <div className={classes.cardImage}>
                <Image
                    width={75}
                    height={75}
                    src={item.image}
                />
            </div>
            <div className={classes.cardData}>
                <Text className={classes.cardTitle}>
                    {item.title}
                </Text>
                <Text size="xs" className={classes.cardDescription}>
                    {item.trending_percent}
                </Text>
            </div>
        </div>
    </Card>
    )
}
export default function BannerItems() {
    const { classes } = useStyles();
    return (
        <div className={classes.containerWrapper}>
            <SimpleGrid cols={4} p={10} className={classes.cardFirstRow}>
                {ListItem.slice(0, 5).map((item) => (
                    <CardRendering item={item} />
                ))
                }
            </SimpleGrid>
            <SimpleGrid cols={4} p={10} className={classes.cardSecondRow}>
                {ListItem.slice(4, 9).map((item) => (
                    <CardRendering item={item} />
                ))
                }
            </SimpleGrid>
        </div>
    );
}
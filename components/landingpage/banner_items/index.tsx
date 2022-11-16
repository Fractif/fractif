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

const ListItem = [
    {
        title: "Rolex",
        trending_percent: "+12,35%",
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1042476023335366746/test.png"
    },
    {
        title: "Hermès",
        trending_percent: "+12,35%",
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1042469928432832642/png-transparent-chanel-hermxe8s-birkin-bag-handbag-black-women-s-bag-white-luggage-bags-black-hair-removebg-preview.png"
    },
    {
        title: "Ferrari",
        trending_percent: "+12,35%",
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1042476939014852659/812-500x500.png"
    },
    {
        title: "Jaeger-leCoultre",
        trending_percent: "+12,35%",
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1042469930471272588/Jaeger-LeCoultre-ReversoTributeDuoface-3988482-222237-1-220816-141305-removebg-preview.png"
    },
    {
        title: "Porsche",
        trending_percent: "+12,35%",
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1042469929074569316/png-transparent-porsche-918-spyder-porsche-carrera-gt-international-motor-show-germany-old-car-car-roadster-computer-wallpaper-removebg-preview.png"
    },
    {
        title: "Patek Philippe",
        trending_percent: "+12,35%",
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1042469929837920266/kisspng-patek-philippe-co-automatic-watch-complication-incarnation-5b06bc17136245.0077177715271680230794-removebg-preview.png"
    },
    {
        title: "Audemars Piguet",
        trending_percent: "+12,35%",
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1042459447307546664/png-transparent-audemars-piguet-royal-oak-chronograph-watch-audemars-piguet-royal-oak-offshore-chronograph-watch-watch-accessory-bracelet-accessories-removebg-preview.png"
    },
    {
        title: "Dior",
        trending_percent: "+12,35%",
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1042469929447854090/air-jordan-1-high-dior-625809_1200x-removebg-preview.png"
    },
    {
        title: "Porsche",
        trending_percent: "+12,35%",
        image: "https://cdn.discordapp.com/attachments/751483695214362704/1042469929074569316/png-transparent-porsche-918-spyder-porsche-carrera-gt-international-motor-show-germany-old-car-car-roadster-computer-wallpaper-removebg-preview.png"
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
                    width={100}
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
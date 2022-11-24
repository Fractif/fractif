import { useEffect, useState } from 'react';
import {
    Container,
    Image,
    Text,
    Group,
    Title,
    Slider,
    Box,
    Chip,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

//import styles
import { useStyles } from './index.style';

//import assets
import watch from '@public/demo/watch.png';
import bag from '@public/demo/bag.png';
import car from '@public/demo/car.png';


//import icons
import { IconArrowNarrowUp } from '@tabler/icons';

type Item = {
    type: string;
    item: string;
    asset: string;
    roi: number;
};


const ItemDemoList: Item[] = [
    {
        type: "watches",
        item: "Rolex GMT-Master II Pepsi",
        asset: watch.src,
        roi: 23.06,
    },
    {
        type: "bags",
        item: "Hermès Birkin 35 handbag",
        asset: bag.src,
        roi: 15.62,
    },
    {
        type: "cars",
        item: "Porsche 911 Touring Pack",
        asset: car.src,
        roi: 8.75,
    },

]
const beautifyPrice = (price: number) => {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function calculateEstimatedCashout(item: Item, price: number) {
    const estimatedCashout = (item.roi / 100) * price;
    const fullCashout = estimatedCashout + price;
    return beautifyPrice(fullCashout);
}

export default function Demo() {
    const { classes, theme } = useStyles();
    const { width } = useViewportSize();
    const [demoItem, setDemoItem] = useState("watches");
    const [investAmount, setInvestAmount] = useState(50);
    const [itemData, setItemData] = useState<Item>(ItemDemoList.find((item) => item.type === demoItem) as Item);

    useEffect(() => {
        setItemData(ItemDemoList.find((item) => item.type === demoItem) as Item)
    }, [demoItem])

    //TODO: Fix Box ROI 
    return (
        <Container >
            <div className={classes.wrapper}>
                <div>
                    <Group>
                        <Box className={classes.macosRed}></Box>
                        <Box className={classes.macosOrange}></Box>
                        <Box className={classes.macosGreen}></Box>
                    </Group>
                </div>


                <div className={classes.cardBody}>
                    <div className={classes.cardData}>

                        <div className={classes.cardTitleSection}>
                            <div>
                                <Title className={classes.CardTitle}>ROI Calculator</Title>
                                <Text>{itemData?.item}</Text>
                            </div>
                            <Chip.Group
                                className={classes.cardChipSelector}
                            >
                                <Chip value="watches" onClick={() => setDemoItem("watches")}>Watches</Chip>
                                <Chip value="bags" onClick={() => setDemoItem("bags")}>Bags</Chip>
                                <Chip value="cars" onClick={() => setDemoItem("cars")}>Cars</Chip>
                            </Chip.Group>
                        </div>
                        {
                            width < theme.breakpoints.md ?
                                <div className={classes.cardImage}>
                                    <Image
                                        src={itemData?.asset}
                                        alt={itemData?.item}
                                    />
                                </div>
                                : ""
                        }
                        <div className={classes.cardCalculatorSection}>
                            <Text className={classes.sectionTitle}>Investment Amount</Text>
                            <Slider
                                pt={10}
                                label={(value) => `$${value}`}
                                onChange={(value) => setInvestAmount(value)}
                                defaultValue={5000}
                                step={1}
                                min={50}
                                max={10002}
                                marks={[
                                    { value: 0, label: '$50' },
                                    { value: 10000, label: '$10,000' },
                                ]} />
                            <div className={classes.cardRoiSection}>
                                <Text className={classes.subtitle}>
                                    ROI from 2021 to 2022
                                </Text>
                                <Box className={classes.roiCard}>
                                    {itemData?.roi}%
                                </Box>
                                <div className={classes.roiDollars}>
                                    <IconArrowNarrowUp size={22} stroke={1.5} />
                                    <Text >

                                        ${calculateEstimatedCashout(itemData, investAmount)}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        width > theme.breakpoints.md ?
                            <div className={classes.cardImage}>
                                <Image
                                    src={itemData?.asset}
                                    alt={itemData?.item}
                                />
                            </div>
                            : ""
                    }
                </div>
            </div>
        </Container>
    )
}

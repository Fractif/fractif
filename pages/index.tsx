import { BackgroundImage, createStyles } from '@mantine/core';

//Import landing page components
import Hero from '@components/landingpage/hero'
import Features from '@components/landingpage/features'
import Discover from '@components/landingpage/discover'


const useStyles = createStyles((theme) => ({
    background_effect: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        zIndex: -1, 
        width: "30%", 
        height: '100%'
    },
}));


export default function LandingPage() {
    const { classes } = useStyles();

    return (
        <>
            <BackgroundImage
                src="/landing_effect.svg"
                className={classes.background_effect}
            />
            <Hero />
            <Features />
            <Discover />

        </>
    )
}
import { BackgroundImage, createStyles } from '@mantine/core';

//Import landing page components
import Hero from '@components/landingpage/Hero'
import Features from '@components/landingpage/Features'
import Discover from '@components/landingpage/Discover'
import BannerCTA from '@components/landingpage/BannerCta';
import Roadmap from '@components/landingpage/Roadmap';
import Team from '@components/landingpage/Team';
import Ama from '@components/landingpage/Ama';
import BannerItems from '@components/landingpage/BannerItems'
import Demo from '@components/landingpage/Demo'

const useStyles = createStyles(() => ({
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
            <BannerItems />
            <Discover />
            <Features />
            <Demo />
            <BannerCTA />
            <Roadmap />
            <Team />
            <Ama />

        </>
    )
}
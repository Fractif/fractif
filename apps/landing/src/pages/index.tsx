import { BackgroundImage, createStyles } from '@mantine/core';

//Import landing page components
import Hero from '@components/Hero'
import Features from '@components/Features'
import Discover from '@components/Discover'
import BannerCTA from '@components/BannerCta';
import Roadmap from '@components/Roadmap';
import Team from '@components/Team';
import Ama from '@components/Ama';
import BannerItems from '@components/BannerItems'
import Demo from '@components/Demo'

const useStyles = createStyles(() => ({
    background_effect: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        zIndex: -1, 
        width: "30%", 
        height: '100%'
    },
    inner: {
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',

    }
}));


export default function LandingPage() {
    const { classes } = useStyles();

    return (
        <div className={classes.inner}>
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

        </div>
    )
}
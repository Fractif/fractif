import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
    },

    title: {
        marginBottom: theme.spacing.md,
        paddingLeft: theme.spacing.md,
    },

    item: {
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    },

    blueDot: {
        color: theme.colors.brand[4]
    },
    ctaDiscord: {
        paddingTop: theme.spacing.xl,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },

    wrapperbannerComponent: {
        backgroundColor: theme.colors.brand[0],
    },

    titleBannerComponent: {
        fontSize: 87,
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: theme.spacing.md,
        [theme.fn.smallerThan('md')]: {
            fontSize: 45,
        },
    },

    containerBannerComponent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
    },
}));
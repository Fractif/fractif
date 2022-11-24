import {
    createStyles,
} from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 40,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    footerHeader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: "100%",
        width: "100%",
        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    footerLinks: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 40,
        paddingTop: 10,
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            paddingTop: 5,
        },
    },

    links: {
        marginTop: 5,
        textDecoration: 'none',
        fontSize: 14,
        color: theme.colors.gray[6],
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
            textAlign: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: "fit-content",
        height: "fit-content",
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column-reverse',
            gap: 25
        },
    },

    social: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
        },
    },

    socialIcons: {
        marginRight: 10,
        backgroundColor: theme.colors.brand[4],
        borderRadius: 100,
        color: "white"
    },

    blueDot: {
        color: theme.colors.brand[4]
    },

    newsletterButton: {
        backgroundColor: theme.colors.brand[4],
        color: "white",
        '&:hover': {
            backgroundColor: theme.colors.brand[4],
            color: "white",
            opacity: 0.8,
        }
    },

    newsletterForm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: theme.colors.gray[4],
        borderRadius: 5,
        borderStyle: 'solid',
        padding: 4,
    },

    newsletterTitle :{
        marginBottom: 20,
    },
    logo:{
        fontSize: 32,
        fontWeight: 700,
    },
}));
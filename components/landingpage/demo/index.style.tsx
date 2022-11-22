import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: {
        height: "fit-content",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 10px 20px rgba(0,0,0,.1), 0 20px 40px rgba(0,0,0,.1)",
        [theme.fn.smallerThan('md')]: {
            height: "fit-content",
        },
    },

    macosRed: {
        backgroundColor: '#FF544D',
        width:"15px",
        height:"15px",
        borderRadius: "50%",
    },

    macosOrange:{
        backgroundColor: '#FEB429',
        width:"15px",
        height:"15px",
        borderRadius: "50%",
    },
    macosGreen:{
        backgroundColor: '#24C138',
        width:"15px",
        height:"15px",
        borderRadius: "50%",
    },
    cardData:{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        gap: "20px",
        justifyContent: "center",
        width: "80%",
        [theme.fn.smallerThan('md')]: {
            width: "100%",
        },
    },
    cardBody:{
        display: "flex",
        height: "100%",
        padding: "35px",
        gap: 50,
        flexDirection: "row",
        [theme.fn.smallerThan('md')]: {
            flexDirection: "column",
        },
    },
    cardRightSection:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        [theme.fn.smallerThan('md')]: {
            display: "none",
        },
    },
    cardChipSelector:{
        display: "flex",
        flexDirection: "row",
    },
    cardTitleSection:{
        display: "flex",
        flexDirection: "row",
        alignContent:"center",
        gap: "10px",

        [theme.fn.smallerThan('xl')]: {
            flexDirection: "column",
        },
    },
    cardCalculatorSection:{
        display: "flex",
        flexDirection: "column",
    },
    cardRoiSection:{
        display:"flex",
        flexDirection:"column",
        alignContent:"center",
        justifyContent:"center",
        paddingTop: "60px",
        gap: "10px",
    },
    subtitle:{
        textAlign:"center",
        color:  theme.colors.gray[6],
        [theme.fn.smallerThan('md')]: {
            fontSize: "14px",
        },
    },
    sectionTitle:{
        fontWeight:500, 
        color:theme.colors.gray[6],
    },
    roiCard:{
        backgroundColor:theme.colors.brand[4],
        color:"white",
        borderRadius: "10px",
        textAlign: "center",
        fontSize:'30px',
        [theme.fn.smallerThan('md')]: {
            fontSize: "20px",
        },
    },
    roiDollars:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        color: theme.colors.sucess[2],
        gap:5,
        paddingTop: 10,
        [theme.fn.smallerThan('md')]: {
            fontSize: "14px",
        },
    },
    cardImage:{
        alignSelf: "center",
        justifySelf: "center",
        [theme.fn.smallerThan('md')]: {
            width: "80%",
        },
    },
    CardTitle:{
        [theme.fn.smallerThan('md')]: {
            fontSize: "28px",
        },
    }
}));
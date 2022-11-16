import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    popupContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 35,
    },
    popupFooter:{
        display: "flex",
        flexDirection:"column",
        width:"100%",
        gap:10
    },
    popupGroupBulletPoint:{
        width:"80%",
    },
    popupBulletPoint: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        fontSize:"14px",
    },
    popupInput: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: theme.colors.brand[0],
    },

    popupButton: {
        width: "100%",
        height: "55px",
        fontSize: "16px"
    },

    popupTitle: {
        textAlign: "center",
        fontSize: "32px"
    },
    popupCheckIcon:{
        color: theme.colors.brand[4],
    }
}));
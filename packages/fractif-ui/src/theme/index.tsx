

export const FractifUiTheme = {
    /** Put your mantine theme override here */
    colorScheme: 'light',
    colors: {
        brand: [
            "#f4f8fd",
            "#d3e1f7",
            "#adc7ef",
            "#7ea7e6",
            "#0657CF",
            "#3e7cda",
            "#1c65d3",
            "#054dba",
            "#05429e",
            "#033073"
        ],
        sucess: [
            "#edfbf3",
            "#b4edcc",
            "#6bdb9b",
            "#2bbd69",
            "#26a95e",
            "#208f4f",
            "#1b7943",
            "#166136",
            "#12522d",
            "#0d3b21"
        ],
    },
    breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
    },
    primaryColor: 'brand',
    components: {
        Container: {
            defaultProps: {
                p: 48,
                sizes: {
                    xs: "540px",
                    sm: "720px",
                    md: "1260px",
                    lg: "1140px",
                    xl: "1320px",
                },
            },
        },
    },
}
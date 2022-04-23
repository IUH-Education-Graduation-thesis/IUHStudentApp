import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../themes/color";
const deviceHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewheaderBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    textHeaderBottom: {
        fontSize: 22,
        fontWeight: '900',
        height: 50,
        paddingTop: 10,
        textAlign: 'center'
    },
    item: {
        backgroundColor: "white",
        height: 60,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    subitem: {
        paddingBottom: 20,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    }, styleView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'flex-end'
    },
    header: {
        fontSize: 32,
    },
    title: {
        fontSize: 20
    },
    headerView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#4baef9',
    },
    contentView: {
        flex: 1.4,
    },
    textHeader: {
        fontSize: 30,
        color: 'white',
        fontWeight: "600"
    },
    subtitle1: {
        fontSize: 20,
        fontWeight: '500',
        height: 30,
        // backgroundColor: COLORS.lightBlue,
        marginBottom: 10,
        // borderWidth: 1
    }, styleBottom: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 10,
        maxHeight: deviceHeight * 3,
        // alignItems: 'center',
    },
    viewContentAccordion:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        // marginTop: 1,
        backgroundColor: COLORS.lightBlue,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginBottom: 2
    }
});
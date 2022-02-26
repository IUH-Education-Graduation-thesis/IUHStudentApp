import { StyleSheet } from "react-native";
import { COLORS } from '../../../themes/color'

export const styles = StyleSheet.create({
    headerView: {
        flex: 1,
        alignItems: 'center',
    },
    container: {
        flex: 1.5,
    },
    inputView: {
        flex: 0.5,
        alignItems: 'center',
        marginTop: 100,
    },
    btnView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 70,
    },
    headerText: {
        fontSize: 40,
        marginTop: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#2264e8',
        textShadowColor: '#6195fb',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20
    },
    secondaryText: {
        fontSize: 27,
        marginTop: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "#044eb7"
    },
    placeholderText: {
        marginHorizontal: 5,
        backgroundColor: '#fff',
        fontStyle: 'italic',
        fontSize: 20
    },
    btnStyle: {
        backgroundColor: COLORS.lightOrange,
        width: "90%",
        height: 70,
        borderRadius: 20,
        shadowColor: '#4c4038', // IOS
        shadowOffset: { height: "30%", width: "90%" }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2,
        alignItems: 'center',
        justifyContent: "center",

    },
    textBtn: {
        fontSize: 30,
        color: "white",
        fontWeight: "600",
    }
})
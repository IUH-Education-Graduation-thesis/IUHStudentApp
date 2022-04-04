import { COLORS } from "../../../themes/color";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentView: {
        flex: 2,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
        // alignItems: 'center'
    },
    headerView: {
        flex: 0.8,
        alignItems: 'center',
        backgroundColor: '#4baef9'
    },
    imgView: {
        backgroundColor: COLORS.lightPink,
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 2,
        borderColor: 'white'
    },
    textHeader: {
        fontSize: 25,
        color: "white",
        fontWeight: "600"
    },
    textSVHeader: {
        fontSize: 22,
        color: "white", paddingTop: 5
    },
    head: { height: 40 },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, alignItems: 'flex-start' },
    row: { height: 28 },
    text: { textAlign: 'center', fontSize: 16 },
    btnStyle: {
        width: "90%",
        height: 60,
        backgroundColor: "#4baef9",
        borderRadius: 10,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        fontSize: 30,
        fontWeight: '600',
        color: 'white'
    },
    btnView: {
        alignItems: 'center'
    }

})
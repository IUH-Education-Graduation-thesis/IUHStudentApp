import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerView: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#4baef9',
        paddingTop: 20,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60
    },
    contentView: {
        flex: 1.4,
    },
    textHeader: {
        fontSize: 20,
        color: 'white'
    },
    featureView: {
        flex: 0.5,
        alignItems: 'center',
        borderRadius: 20,
        position: 'absolute',
        marginTop: 70,
        marginHorizontal: 40,
        backgroundColor: 'white',
        width: "80%",
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 8,
        flexDirection: "row",
        justifyContent: 'space-around'
    },
})
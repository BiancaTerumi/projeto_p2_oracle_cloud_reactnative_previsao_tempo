import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E0E7E9",
    },
    cityContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 50,
    },
    cityText: {
        fontSize: 18,
        marginLeft: 5,
    },
    searchButton: {
        alignItems: "center",
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "#243657"
    },
    buttonText: {
        fontSize: 18,
        color: "white"
    },
    weatherList: {
        padding: 20
    },
    separator: {
        marginVertical: 5
    },
    loading: {
        flex:1
    },
})
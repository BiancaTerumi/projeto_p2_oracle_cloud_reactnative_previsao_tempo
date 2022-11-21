import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 10,
        backgroundColor: "#667ca3",
        elevation: 10
    },
    dateText: {
        marginBottom: 10,
        fontSize: 12,
        color: "white"
    },
    tempText: {
        textAlign: "center",
        fontSize: 16,
        color: "white"
    },
    icon: {
        height: 40,
        width: 40
    },
    weatherRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }
})
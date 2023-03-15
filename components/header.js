import { StyleSheet, Text, View } from "react-native";

export default function Header() {

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Weather Wardrobe</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        paddingTop: 60,
        backgroundColor: '#8447FF'
    },
    title: {
        textAlign:"center",
        color: "white",
        fontSize: 23,
        fontWeight: 'bold',
    }

});
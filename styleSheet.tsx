import { StyleSheet } from "react-native";


const Song = StyleSheet.create({
    Song: {
        padding: 25,
        margin: 20,
        marginVertical: 10,
        fontSize: 18,
        backgroundColor: "#fff",
        borderRadius: 20,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 10,
        elevation: 3
    },
    Title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "rgb(59, 59, 59)",
        paddingBottom: 20
    },
    Lyrics: {
        fontSize: 20,
        color: "rgb(66, 66, 66)",
        paddingVertical: 5
    }
})

const styles = StyleSheet.create({
    SongDisplay: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

const CustomDrawer = StyleSheet.create({
    CustomDrawer: {
        
    },

    DrawerItem: {

    },

    DrawerSearch: {
    },

    DrawerHeader: {
        color: "rgb(59, 59, 59)"
    }
})


export default styles;
export {Song, CustomDrawer};
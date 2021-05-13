import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import JSONSongs from "./songs.json";
import styles, {Song as SongStyle} from "./styleSheet";

let songs: {title: string, lyrics: string[]}[] = JSONSongs;

function Song(props: {title: string, lyrics: string[]}) {
    // let [output, setOutput] = useState<JSX.Element[]>();

    // useEffect(() => {
    //     let formatted = props.lyrics.map((value, index) => {
    //         return (
    //             <Text 
    //                 key={value + index}
    //                 style={SongStyle.Lyrics}
    //             >
    //                 {value}
    //             </Text>
    //         );
    //     });

    //     setOutput(formatted);
    // }, [props]);

    let formatted = props.lyrics.map((value, index) => {
        return (
            <Text 
                key={value + index}
                style={SongStyle.Lyrics}
            >
                {value}
            </Text>
        );
    });

    return (
        <View style={SongStyle.Song}>
            <Text style={SongStyle.Title}>{props.title}</Text>
            {formatted}
        </View>
    );
}

export default function SongDisplay(props: {numToRender: number, songDisplayRef?: React.RefObject<FlatList<{title: string,lyrics: string[]}>>, songs: {title: string, lyrics: string[]}[]}) {
    // let [refreshing, setRefreshing] = useState(false);
    let [flatList, setFlatList] = useState<JSX.Element>(<Text></Text>);
    let refreshing = false;

    const renderingFunction = (data: any) => {
        if (!refreshing) {
            refreshing = true;
            console.log("rendering items");
            setTimeout(() => {
                refreshing = false;
            }, 3000);
        }
        let {item, index} = data;
        return <Song title={(index + 1) + ": " + item.title} lyrics={item.lyrics}/>
    }

    const keyExtractor = (item: {title: string, lyrics: string[]}, index: number) => {
        return item.title + item.lyrics[0];
    }

    useEffect(() => {
        setFlatList(
            <FlatList
                style={styles.SongDisplay}
                data={props.songs}
                renderItem={renderingFunction}
                keyExtractor={keyExtractor} 
                ref={props.songDisplayRef}
                initialNumToRender={props.numToRender}
                onEndReachedThreshold={1}
                maxToRenderPerBatch={40}
            />
        );
    }, [songs])

    return(
        flatList
    );
}

export {songs};
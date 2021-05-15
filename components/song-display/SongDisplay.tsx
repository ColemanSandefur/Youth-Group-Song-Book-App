import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import JSONSongs from "../../songs.json";
import styles, {Song as SongStyle} from "../../styleSheet";
import Song from "./Song"

let songs: {title: string, lyrics: string[]}[] = JSONSongs;



export default function SongDisplay(props: {numToRender: number, songDisplayRef?: React.RefObject<FlatList<{title: string,lyrics: string[]}>>, songs: {title: string, lyrics: string[]}[]}) {
    let [flatList, setFlatList] = useState<JSX.Element>(<Text style={{textAlign: "center"}}>LOADING</Text>);

    const renderingFunction = (data: any) => {
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
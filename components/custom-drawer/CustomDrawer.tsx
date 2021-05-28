import "react-native-gesture-handler";
import * as React from 'react';
import { DrawerContentComponentProps, DrawerContentOptions, DrawerItem } from "@react-navigation/drawer";
import { FlatList, Platform, ScrollView, Text } from 'react-native';
import {songs} from '../song-display/SongDisplay';
import { useState } from "react";
import { SearchBar } from 'react-native-elements';
import {CustomDrawer as CustomDrawerStyle} from "../../styleSheet"
import { SafeAreaView } from "react-native-safe-area-context";

const formatSongs = (props: {
  songs: {title: string, number: number}[],
  onItemPress: (item: {title: string}, index: number) => void
}) => {
  console.log("updating");
  let formatted= props.songs.map((song) => {
    return ({
      name: song.title,
      dom: (
        <DrawerItem 
          label={(song.number + 1) + ": " + song.title}
          onPress={()=> props.onItemPress(song, song.number)}
          style={CustomDrawerStyle.DrawerItem}
          key={song.title + song.number}
        />
      )
    })
  });

  formatted.sort((a, b) => (a.name > b.name) ? 1 : -1);

  let startingChar = " ";
  for (let i = 0; i < formatted.length; i++) {
    if (startingChar.toLowerCase() !== formatted[i].name[0].toLowerCase()) {
      startingChar = formatted[i].name[0].toLowerCase();

      formatted.splice(i, 0, {
        "name": startingChar,
        dom: (
          <Text key={startingChar + i} style={{...CustomDrawerStyle.DrawerHeader, textAlign: "center", fontWeight: "bold", fontSize: 20}}>{startingChar.toUpperCase()}</Text>
        )
      })
    }
  }

  let output = formatted.map((song) => {
    return song.dom;
  })

  return output;
}

const cleanse = (search: string) => {
  return search.replace(/[^\w\d\s]/g, "").toLowerCase();
}

const matches = (search: string, song: {title: string,lyrics: string[], number: number}) => {

  //remove unnecessary characters like commas and periods
  let title = cleanse(song.title);

  return title.includes(search) || song.number + 1 === Number.parseInt(search);
}

const searchSongs = (search: string, songs: {title: string,lyrics: string[]}[]) => {
  let output = songs.slice().map((value, index) => {
    return {...value, number: index};
  });

  search = cleanse(search);
  
  for (let i = 0; i < output.length; i++) {
    if (!matches(search, output[i])) {
      output.splice(i, 1);
      i--;
    }
  }

  return output;
}

export default function CustomDrawer(props: {drawerProps: DrawerContentComponentProps<DrawerContentOptions>, songListRef: React.RefObject<FlatList<{title: string,lyrics: string[]}> | null>}) {
  let [output, setOutput] = useState<JSX.Element[]>([]);
  let [search, setSearch] = useState<string>("");
  let [songResults,  setSongResults ] = useState<{title: string,lyrics: string[], number: number}[]>(songs.map((value, index) => {return {...value, number: index}}));
  
  const onItemPress = (item: {title: string}, index: number) => {
    props.drawerProps.navigation.closeDrawer();
    props.songListRef.current?.scrollToIndex({
      index: index,
      animated: true
    });
  }

  const updateSearch = (search: string) => {
    setSearch(search);

    setSongResults(searchSongs(search, songs));
  }

  React.useEffect(() => {
    let songs = songResults.map((value) => {return {title: value.title, number: value.number}});

    setOutput(formatSongs({songs, onItemPress}));
    console.log("UPDATING OUTPUT")
  }, [search, songResults]);

  const platform = () => {
    if (Platform.OS === "ios") {
      return "ios"
    }
    if (Platform.OS === "android") {
      return "android"
    }

    return "default";
  }

  return (
    <>
      <SafeAreaView style={{}}>
        <SearchBar 
          placeholder={"Search for a song..."}
          onChangeText={updateSearch}
          value={search}
          platform={platform()}
          style={CustomDrawerStyle.DrawerSearch}
        />
      </SafeAreaView>
      <ScrollView>
        {output}
      </ScrollView>
    </>
  );
}
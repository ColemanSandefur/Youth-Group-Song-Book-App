import "react-native-gesture-handler";
import * as React from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { FlatList, StyleSheet, Text } from 'react-native';
import SongDisplay, {songs} from './SongDisplay';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRef, useState } from "react";

const Drawer = createDrawerNavigator();

const formatSongs = (props: {
  songs: {title: string}[],
  onItemPress: (item: {title: string}, index: number) => void
}) => {
  let formatted= props.songs.map((song, index) => {
    return ({
      name: song.title,
      dom: (
        <DrawerItem 
          label={(index + 1) + ": " + song.title}
          onPress={()=> props.onItemPress(song, index)}
          key={song.title + index}
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
          <Text key={startingChar + i}>{startingChar.toUpperCase()}</Text>
        )
      })
    }
  }

  let output = formatted.map((song) => {
    return song.dom;
  })

  return output;
}

function CustomDrawer(props: {drawerProps: DrawerContentComponentProps<DrawerContentOptions>, songListRef: React.RefObject<FlatList<{title: string,lyrics: string[]}> | null>}) {
  let [output, setOutput] = useState<JSX.Element[]>([]);
  
  let onItemPress = (item: {title: string}, index: number) => {
    props.drawerProps.navigation.closeDrawer();
    props.songListRef.current?.scrollToIndex({
      index: index,
      animated: true
    });
  }

  React.useEffect(() => {
    setOutput(formatSongs({songs, onItemPress}));
    console.log("UPDATING OUTPUT")
  }, [songs]);

  // return (
  //   <FlatList
  //     data={songs}
  //     renderItem={({item, index}) => {
  //       return (
  //         <Button 
  //           onPress={(ev) => onItemPress(ev, item, index)}
  //           title={(index + 1) + ": " + item.title}
  //         />
  //       );
  //     }}
  //     keyExtractor={(item, index) => item.title + index} 
  //   />
  // );
  // let formatted= songs.map((value, index) => {
  //   return (
  //     <DrawerItem 
  //       label={(index + 1) + ": " + value.title}
  //       onPress={()=> onItemPress(value, index)}
  //       key={index}
  //     />
  //   )
  // });

  return (
    <DrawerContentScrollView>
      {output}
    </DrawerContentScrollView>
  );
}

export default function App() {
  let SongDisplayRef = useRef<FlatList<{title: string,lyrics: string[]}>>(null);
  let numToRender = songs.length;

  setTimeout(() => {numToRender = 10;}, 500);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <CustomDrawer drawerProps={props} songListRef={SongDisplayRef}/>}>
          {/* <Drawer.Screen name="Songs" component={SongDisplay} initialParams={{props:{songNumber: 3, songDisplayRef: SongDisplayRef}}} options={{headerShown: true}}/> */}
          <Drawer.Screen name="Songs" options={{headerShown: true}}>
            {() => {
              return (
                <SongDisplay numToRender={numToRender} songDisplayRef={SongDisplayRef} songs={songs}/>
              )
            }}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

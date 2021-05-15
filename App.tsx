import "react-native-gesture-handler";
import * as React from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FlatList } from 'react-native';
import SongDisplay, {songs} from './components/song-display/SongDisplay';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import CustomDrawer from "./components/custom-drawer/CustomDrawer"

const Drawer = createDrawerNavigator();

export default function App() {
  let SongDisplayRef = useRef<FlatList<{title: string,lyrics: string[]}>>(null);
  let numToRender = songs.length;

  setTimeout(() => {numToRender = 10;}, 500);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <CustomDrawer drawerProps={props} songListRef={SongDisplayRef}/>}>
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
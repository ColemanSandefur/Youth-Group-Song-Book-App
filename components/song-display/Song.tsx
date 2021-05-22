import React, { PureComponent } from 'react';
import { View, Text } from "react-native";
import {Song as SongStyle} from "../../styleSheet";


export default class Song extends PureComponent<{title: string, lyrics: string[]}, {output: JSX.Element[]}> {
    constructor(props: {title: string, lyrics: string[]}) {
        super(props);

        this.state = {
            output: 
                this.props.lyrics.map((value, index) => {
                    return (
                        <Text 
                            key={value + index}
                            style={SongStyle.Lyrics}
                        >
                            {value}
                        </Text>
                    );
                })
        };
    }

    updateOutput() {
        this.setState({
            output: (
                this.props.lyrics.map((value, index) => {
                    return (
                        <Text 
                            key={value + index}
                            style={SongStyle.Lyrics}
                        >
                            {value}
                        </Text>
                    );
                })
            )
        });
    }

    componentDidUpdate() {
        this.updateOutput();
    }

    render() {

        return (
            <View style={SongStyle.Song}>
                <Text style={SongStyle.Title}>{this.props.title}</Text>
                {this.props.lyrics.map((value, index) => {
                    return (
                        <Text 
                            key={value + index}
                            style={SongStyle.Lyrics}
                        >
                            {value}
                        </Text>
                    );
                })}
            </View>
        )
    }
}
/**
 * Created by zhangmz on 2017/9/16.
 */
import React from 'react'
import {render} from 'react-dom'
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import {MUSIC_LIST} from './config/musiclist'
import {Router, IndexRoute, Link, Route, hashHistory} from 'react-router'
import Pubsub from 'pubsub-js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        }
    }

    playMusic(musicItem) {
        $("#player").jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        })
    }

    playNext(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicItemLength = this.state.musicList.length;
        if (type === 'next') {
            newIndex = (index + 1) % musicItemLength;
        } else {
            newIndex = (index - 1 + musicItemLength) % musicItemLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    }

    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    }

    componentDidMount() {
        $("#player").jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').on($.jPlayer.event.ended, (e) => {
            this.playNext();
        });
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
        });
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter((item) => {
                    return item != musicItem;
                })
            });
        })
    }

    componentWillUnMount() {
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
    }

    render() {
        return (
            <div>
                <Header></Header>
                {React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }
}

class Root extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="list" component={MusicList}></Route>
                </Route>
            </Router>
        );
    }
}

export default Root;
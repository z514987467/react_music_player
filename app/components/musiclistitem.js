/**
 * Created by zhangmz on 2017/9/23.
 */
import React from 'react'
import {render} from 'react-dom'
import './musiclistitem.less'
import PubSub from 'pubsub-js'

class MusicListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    playMusic(musicItem) {
        PubSub.publish('PLAY_MUSIC', musicItem);
    }

    deleteMusic(musicItem, e) {
        e.stopPropagation();//阻止冒泡排序
        PubSub.publish('DELETE_MUSIC', musicItem);
    }

    render() {
        let musicItem = this.props.musicItem;
        return (
            <li className={`components-listitem row  ${this.props.focus ? 'focus' : ''}`}
                onClick={this.playMusic.bind(this, musicItem)}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p className="-col-auto delete" onClick={this.deleteMusic.bind(this, musicItem)}></p>
            </li>
        )
    }
}

export default MusicListItem;
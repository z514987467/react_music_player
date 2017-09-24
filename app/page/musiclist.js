/**
 * Created by zhangmz on 2017/9/23.
 */
import React from 'React'
import {render} from 'react-dom'
import MusicListItem from '../components/musiclistitem'

class MusicList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let listEle = this.props.musicList.map((item) => {
            return (
                <MusicListItem
                    focus = {item === this.props.currentMusicItem}
                    key={item.id}
                    musicItem={item}
                >
                    {item.title}
                </MusicListItem>
            )
        })
        return (
            <ul>
                {listEle}
            </ul>
        )
    }
}
export default MusicList;
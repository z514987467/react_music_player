/**
 * Created by zhangmz on 2017/9/17.
 */
import React from 'react'
import Progress from '../components/progress'
import './player.less'
import {Link} from 'react-router'

let duration = null;
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            isPlay: true
        }
    }

    componentDidMount() {
        $("#player").on($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100
            })
        })
    }

    componentWillUnMount() {
        $("#player").off($.jPlayer.event.timeupdate);
    }

    changeProgressHandler(progress) {
        $("#player").jPlayer('play', (duration * progress));
    }

    changeVolumeHandler(progress) {
        $("#player").jPlayer('volume', progress);
    }

    play() {
        if (this.state.isPlay) {
            $('#player').jPlayer('pause');
        } else {
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        })
    }

    render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-2:00</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div className="volume-wrapper">
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumeHandler}
                                        barColor='#aaa'
                                    >
                                    </Progress>
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px',marginTop:20}}>
                            <Progress
                                progress={this.state.progress}
                                onProgressChange={this.changeProgressHandler}
                            >
                            </Progress>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.prev}></i>
                                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`}
                                   onClick={this.play.bind(this)}></i>
                                <i className="icon next ml20" onClick={this.next}></i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-cycle`} onClick={this.changeRepeat}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img style={{animationPlayState:this.state.isPlay ? 'running' : 'paused'}}
                             src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
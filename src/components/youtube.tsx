import {useState} from "react";
import {Box, Button} from "@material-ui/core";
import YouTube, {Options} from 'react-youtube';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';

function Youtube(props: { id: string, source: string, start: number, end: number }) {
    const [play, setPlay] = useState({play: false, show: false});
    const [ytPlayerState, setYtPlayerState] = useState<number>(-1);
    const setToPlay = () => setPlay({play: true, show: false});
    // clicking play sets `show` to false, which then
    // sets a timeout to set it again to true
    // it unrenders and rerenders the iframe element
    if (play.play && !play.show) {
        setTimeout(() => setPlay({play: true, show: true}), 0);
    }

    const opts = {
        playerVars: {
            autoplay: 1,
            end: props.end,
            start: props.start,
        }
    } as Options;

    function stateChange(e: { target: any; data: number }) {
        setYtPlayerState(e.data);
    }

    const ytStates = YouTube.PlayerState;

    return (
        <div>
            <Button variant="contained" color="primary" onClick={setToPlay}>
                {ytPlayerState === ytStates.PLAYING && <Pause/>}
                {(ytPlayerState === ytStates.UNSTARTED || ytPlayerState === ytStates.ENDED || ytPlayerState === ytStates.PAUSED) &&
                <PlayArrow/>}
                {(ytPlayerState === ytStates.CUED || ytPlayerState === ytStates.BUFFERING) &&
                <span>LOADING</span>}
            </Button>

            {play.play && play.show &&
            <Box component="div" display="none">
                <YouTube
                    videoId={props.source}
                    id={props.id}
                    opts={opts}
                    onStateChange={stateChange}
                />
            </Box>}
        </div>
    );
}

export default Youtube;

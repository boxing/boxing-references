import {useEffect, useState} from "react";
import {Button} from "@material-ui/core";

function Youtube(props: { id: string, source: string, start: number, end: number }) {
    const [play, setPlay] = useState({play: false, show: false});
    const setToPlay = () => setPlay({play: true, show: false});

    function youtubeString(): string {
        if (play) {
            return `https://www.youtube.com/embed/${props.source}?start=${props.start}&end=${props.end}&autoplay=${play ? 1 : 0}`;
        }
        return '';
    }

    // clicking play sets `show` to false, which then
    // sets a timeout to set it again to true
    // it unrenders and rerenders the iframe element
    if (play.play && !play.show) {
        setTimeout(() => setPlay({play: true, show: true}), 100)
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={setToPlay}>
                Listen
            </Button>
            {play.play && play.show &&
            <iframe id={props.id} title={props.id} width="560" height="315" style={{ display: "none" }} src={youtubeString()}
                    frameBorder="0" allowFullScreen/>}
        </div>
    );
}

export default Youtube;

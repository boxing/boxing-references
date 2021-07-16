import {useState} from "react";

function Youtube(props: { id: string, source: string, start: number, end: number }) {
    const [play, setPlay] = useState(false);
    const setToPlay = () => setPlay(true);

    function youtubeString(): string {
        return `https://www.youtube.com/embed/${props.source}?start=${props.start}&end=${props.end}&autoplay=${play ? 1 : 0}`;
    }

    return (
        <div>
            <button onClick={setToPlay}>
                Play
            </button>
            <iframe id={props.id} title={props.id} width="560" height="315" src={youtubeString()}
                    frameBorder="0" allowFullScreen/>
        </div>
    );
}

export default Youtube;

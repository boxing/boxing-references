function Youtube(props: { source: string, start: number, end: number }) {

    function youtubeString(): string {
        return `https://www.youtube.com/embed/${props.source}?start=${props.start}&end=${props.end}&autoplay=1`;
    }

    return (
        <iframe width="560" height="315" src={youtubeString()}
                frameBorder="0" allowFullScreen/>
    );
}

export default Youtube;

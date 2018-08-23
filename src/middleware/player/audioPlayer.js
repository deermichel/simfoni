class AudioPlayer {
    constructor() {
        this.audio = new Audio();
    }

    setUpdateTimeCallback(updateTime) {
        this.audio.ontimeupdate = () => updateTime(this.audio.currentTime);
    }

    setEndedCallback(ended) {
        this.audio.onended = () => ended();
    }

    seek(time) {
        this.audio.currentTime = time;
    }

    pause() {
        this.audio.pause();
    }

    play() {
        return this.audio.play();
    }

    load(source) {
        this.pause();
        this.audio.src = source;
        this.audio.load();
    }
}

export default AudioPlayer;

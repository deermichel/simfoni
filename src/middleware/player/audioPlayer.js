class AudioPlayer {
    constructor() {
        this.audio = new Audio();
    }

    pause() {
        this.audio.pause();
    }

    play(source, updateTime) {
        this.pause();
        this.audio.src = source;
        this.audio.ontimeupdate = () => updateTime(this.audio.currentTime);
        return this.audio.play();
    }
}

export default AudioPlayer;

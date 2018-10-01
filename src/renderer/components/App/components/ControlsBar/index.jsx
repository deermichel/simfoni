import React from "react";
import { Map } from "immutable";
import SkipButton, { SkipDirection } from "./components/SkipButton";
import PlayButton from "./components/PlayButton";
import DurationBar from "./components/DurationBar";
import ScrollingText from "~/components/ScrollingText";
import PlayState from "~/constants/PlayState";
import styles from "./style.scss";
import VolumeControl from "./components/VolumeControl";
import MenuButton from "./components/MenuButton";
import VinylBackground from "./components/VinylBackground";

const ControlsBar = ({
    nowPlaying = Map(),
    onSkipForward,
    onSkipBackward,
    onPlay,
    onSeek,
    onMute,
    onSetVolume,
    onShowMenu,
}) => (
    <div className={styles.controlsbar}>
        <DurationBar
            currentTime={nowPlaying.get("currentTime")}
            totalTime={nowPlaying.getIn(["currentTrack", "duration"])}
            onSeek={onSeek}
        />
        <div className={styles.container}>
            <VinylBackground
                imageUrl={nowPlaying.getIn(["currentTrack", "coverart"])}
                isPlaying={nowPlaying.get("playState") === PlayState.PLAYING}
            />
            <div className={styles.menubutton}>
                <MenuButton onShowMenu={onShowMenu} />
            </div>
            <div className={styles.currenttitle}>
                <ScrollingText text={nowPlaying.getIn(["currentTrack", "title"])} />
            </div>
            <div className={styles.buttons}>
                <SkipButton
                    disabled={nowPlaying.get("playState") === PlayState.STOPPED}
                    direction={SkipDirection.BACKWARD}
                    onSkip={onSkipBackward}
                />
                <PlayButton playing={nowPlaying.get("playState") === PlayState.PLAYING} onPlay={onPlay} />
                <SkipButton
                    disabled={nowPlaying.get("playState") === PlayState.STOPPED}
                    direction={SkipDirection.FORWARD}
                    onSkip={onSkipForward}
                />
            </div>
            <div className={styles.currentartist}>
                <ScrollingText text={nowPlaying.getIn(["currentTrack", "artist"])} />
            </div>
            <div className={styles.volumecontrol}>
                <VolumeControl
                    onMute={onMute}
                    onSetVolume={onSetVolume}
                    volume={nowPlaying.get("volume")}
                    muted={nowPlaying.get("muted")}
                />
            </div>
        </div>
    </div>
);

export default ControlsBar;

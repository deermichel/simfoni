import React from "react";
import { Play, Pause } from "react-feather";
import IconButton, { ButtonSize } from "~/components/IconButton";

export const PlayWithMargin = ({ size }) => ( // looks better
    <div style={{ display: "grid", marginLeft: 5 }}>
        <Play size={size} />
    </div>
);

const PlayButton = ({ onPlay, playing, disabled }) => (
    <IconButton
        onClick={onPlay}
        disabled={disabled}
        icon={(playing) ? Pause : PlayWithMargin}
        size={ButtonSize.LARGE}
    />
);

export default PlayButton;

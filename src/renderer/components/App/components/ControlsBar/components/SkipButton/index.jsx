import React from "react";
import { SkipForward, SkipBack } from "react-feather";
import IconButton from "~/components/IconButton";

export const SkipDirection = {
    FORWARD: "FORWARD",
    BACKWARD: "BACKWARD",
};

const SkipButton = ({ direction = SkipDirection.FORWARD, onSkip, disabled }) => (
    <IconButton
        onClick={onSkip}
        disabled={disabled}
        icon={(direction === SkipDirection.FORWARD) ? SkipForward : SkipBack}
    />
);

export default SkipButton;

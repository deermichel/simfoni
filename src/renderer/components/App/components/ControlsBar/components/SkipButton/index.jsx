import React from "react";
import PropTypes from "prop-types";
import { SkipForward, SkipBack } from "react-feather";
import IconButton from "~/components/IconButton";

export const SkipDirection = {
    FORWARD: "FORWARD",
    BACKWARD: "BACKWARD",
};

const propTypes = {
    onSkip: PropTypes.func,
    direction: PropTypes.oneOf(Object.values(SkipDirection)),
    disabled: PropTypes.bool,
};
const defaultProps = {
    onSkip: null,
    direction: SkipDirection.FORWARD,
    disabled: false,
};

const SkipButton = ({ direction, onSkip, disabled }) => (
    <IconButton
        onClick={onSkip}
        disabled={disabled}
        icon={(direction === SkipDirection.FORWARD) ? SkipForward : SkipBack}
    />
);

SkipButton.propTypes = propTypes;
SkipButton.defaultProps = defaultProps;

export default SkipButton;

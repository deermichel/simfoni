import React from "react";
import PropTypes from "prop-types";
import { SkipForward, SkipBack } from "react-feather";
import Button from "~/components/Button";

export const SkipDirection = {
    FORWARD: "FORWARD",
    BACKWARD: "BACKWARD",
};

const propTypes = {
    onSkip: PropTypes.func,
    direction: PropTypes.oneOf(Object.values(SkipDirection)),
};
const defaultProps = {
    onSkip: null,
    direction: null,
};

const SkipButton = ({ direction, onSkip }) => (
    <Button className="skipButton" onClick={onSkip}>
        {direction === SkipDirection.FORWARD
            && <SkipForward size={24} />
        }
        {direction === SkipDirection.BACKWARD
            && <SkipBack size={24} />
        }
    </Button>
);

SkipButton.propTypes = propTypes;
SkipButton.defaultProps = defaultProps;

export default SkipButton;

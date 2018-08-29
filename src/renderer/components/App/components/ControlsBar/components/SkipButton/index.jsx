import React from "react";
import PropTypes from "prop-types";
import { SkipForward, SkipBack } from "react-feather";
import Button from "~/components/Button";
import styles from "./style.scss";

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
    direction: null,
    disabled: false,
};

const SkipButton = ({ direction, onSkip, disabled }) => (
    <div className={styles.skipbutton}>
        <Button onClick={onSkip} disabled={disabled}>
            <div className={(disabled) ? styles.disabled : styles.hovercolor}>
                {direction === SkipDirection.FORWARD
                    && <SkipForward size={24} />
                }
                {direction === SkipDirection.BACKWARD
                    && <SkipBack size={24} />
                }
            </div>
        </Button>
    </div>
);

SkipButton.propTypes = propTypes;
SkipButton.defaultProps = defaultProps;

export default SkipButton;

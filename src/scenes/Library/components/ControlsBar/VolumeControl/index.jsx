import React from "react";
import { Volume2 } from "react-feather";
import Button from "~/components/Button";
import styles from "./style.scss";

const propTypes = {
};
const defaultProps = {
};

const VolumeControl = () => (
    <div className={styles.volumecontrol}>
        <Button>
            <div className={styles.hovercolor}>
                <Volume2 size={20} />
            </div>
        </Button>
    </div>
);

VolumeControl.propTypes = propTypes;
VolumeControl.defaultProps = defaultProps;

export default VolumeControl;

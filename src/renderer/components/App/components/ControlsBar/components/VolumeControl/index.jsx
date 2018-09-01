import React from "react";
import PropTypes from "prop-types";
import {
    Volume,
    Volume1,
    Volume2,
    VolumeX,
} from "react-feather";
import Clickable from "~/components/Clickable";
import styles from "./style.scss";
import { ButtonSize } from "~/components/IconButton";

const { iconSize } = ButtonSize.SMALL;

const propTypes = {
    onMute: PropTypes.func,
    onSetVolume: PropTypes.func,
    volume: PropTypes.number,
    muted: PropTypes.bool,
};
const defaultProps = {
    onMute: () => 0,
    onSetVolume: () => 0,
    volume: 1.0,
    muted: false,
};

class VolumeControl extends React.Component {
    constructor() {
        super();
        this.startInteraction = this.startInteraction.bind(this);
        this.stopInteraction = this.stopInteraction.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.state = { bubbleStyle: null, setVolumeMode: false };
    }

    componentDidMount() {
        this.container.addEventListener("mousedown", this.startInteraction);
    }

    componentWillUnmount() {
        this.container.removeEventListener("mousedown", this.startInteraction);
    }

    setVolume(volume) {
        if (Date.now() < this.lastUpdate + 100) return;
        this.lastUpdate = Date.now();

        const { onSetVolume } = this.props;
        onSetVolume(volume);
    }

    startInteraction() {
        this.setState({ setVolumeMode: false });
        window.addEventListener("mouseup", this.stopInteraction);
        window.addEventListener("mousemove", this.mouseMove);
    }

    stopInteraction() {
        window.removeEventListener("mouseup", this.stopInteraction);
        window.removeEventListener("mousemove", this.mouseMove);
        this.setState({ bubbleStyle: null });
    }

    mouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const distance = Math.sqrt(((centerX - e.clientX) ** 2) + ((centerY - e.clientY) ** 2));
        let size = distance * 2;
        if (size < 32) return; // minimum size
        if (size > window.innerWidth) { // maximum -> dampen
            size = window.innerWidth + ((size - window.innerWidth) ** 0.7);
        }

        const volume = size / window.innerWidth;
        this.setVolume(volume);

        this.setState({
            bubbleStyle: {
                animationDuration: "6s",
                background: "__COLOR_PRIMARY_BASE",
                height: size,
                width: size,
            },
            setVolumeMode: true,
        });
    }

    render() {
        const { bubbleStyle, setVolumeMode } = this.state;
        const { onMute, volume, muted } = this.props;
        let icon = <VolumeX size={iconSize} />;
        if (!muted) {
            if (volume < 0.33) {
                icon = <Volume size={iconSize} />;
            } else if (volume < 0.66) {
                icon = <Volume1 size={iconSize} />;
            } else {
                icon = <Volume2 size={iconSize} />;
            }
        }

        return (
            <div className={styles.volumecontrol} ref={(el) => { this.container = el; }}>
                <Clickable onClick={onMute} disabled={setVolumeMode}>
                    <div className={styles.container}>
                        <div className={styles.bubble} style={bubbleStyle}>
                            {icon}
                        </div>
                    </div>
                </Clickable>
            </div>
        );
    }
}

VolumeControl.propTypes = propTypes;
VolumeControl.defaultProps = defaultProps;

export default VolumeControl;

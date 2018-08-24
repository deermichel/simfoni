import React from "react";
import { Volume2 } from "react-feather";
import Button from "~/components/Button";
import styles from "./style.scss";

const propTypes = {
};
const defaultProps = {
};

class VolumeControl extends React.Component {
    constructor() {
        super();
        this.startInteraction = this.startInteraction.bind(this);
        this.stopInteraction = this.stopInteraction.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.state = { hoverCoverStyle: null };
    }

    componentDidMount() {
        this.container.addEventListener("mousedown", this.startInteraction);
    }

    componentWillUnmount() {
        this.container.removeEventListener("mousedown", this.startInteraction);
    }

    startInteraction() {
        window.addEventListener("mouseup", this.stopInteraction);
        window.addEventListener("mousemove", this.mouseMove);
    }

    stopInteraction() {
        window.removeEventListener("mouseup", this.stopInteraction);
        window.removeEventListener("mousemove", this.mouseMove);
        this.setState({ hoverCoverStyle: null });
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

        this.setState({
            hoverCoverStyle: {
                animationDuration: "6s",
                background: "__COLOR_PRIMARY_DARK",
                height: size,
                position: "fixed",
                width: size,
            },
        });
    }

    render() {
        const { hoverCoverStyle } = this.state;

        return (
            <div className={styles.volumecontrol} ref={(el) => { this.container = el; }}>
                <Button>
                    <div className={styles.hovercolor} style={hoverCoverStyle}>
                        <Volume2 size={20} />
                    </div>
                </Button>
            </div>
        );
    }
}

VolumeControl.propTypes = propTypes;
VolumeControl.defaultProps = defaultProps;

export default VolumeControl;

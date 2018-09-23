import React from "react";
import styles from "./style.scss";

class ScrollingText extends React.Component {
    constructor() {
        super();
        this.state = { animate: false };
        this.checkOverflow = this.checkOverflow.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.checkOverflow);
    }

    componentDidUpdate() {
        this.checkOverflow();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkOverflow);
    }

    checkOverflow() {
        if (this.lastOffsetWidth === this.container.offsetWidth) return;
        this.lastOffsetWidth = this.container.offsetWidth;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({ animate: (this.container.offsetWidth + 1 < this.text.offsetWidth) });
        }, 1000);
    }

    render() {
        const { animate } = this.state;
        const { text } = this.props;
        return (
            <div className={styles.scrollingtext} ref={(el) => { this.container = el; }}>
                <span
                    className={styles.scrollbox}
                    data-content={(animate) ? text : ""}
                    ref={(el) => { this.text = el; }}
                    style={(animate) ? { animationDuration: `${text.length / 4}s` } : null}
                >
                    {text}
                </span>
            </div>
        );
    }
}

export default ScrollingText;

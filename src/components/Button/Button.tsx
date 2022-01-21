import React from "react";
import style from "./Button.module.scss"

interface IProps {
    text: string;
    buttonClassName?: string;
}
class Button extends React.Component<IProps & React.HTMLAttributes<HTMLButtonElement>> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.onClick} className={`${style[this.props.buttonClassName]} ${this.props.className }`}>{this.props.text}</button>
        )
    }
}

export default Button;
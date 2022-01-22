import React from "react";
import style from "./Button.module.scss"

interface IProps {
    text: string;
    buttonClassName?: string;
    disabled: boolean
}
class Button extends React.Component<IProps & React.HTMLAttributes<HTMLButtonElement>> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.onClick} className={`${style[this.props.buttonClassName]} ${this.props.className }`} disabled={this.props.disabled}>{this.props.text}</button>
        )
    }
}

export default Button;
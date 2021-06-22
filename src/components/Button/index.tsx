import { ButtonHTMLAttributes } from "react";

import "../../styles/button.scss";

type ButtonsPropsType = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonsPropsType) {
  return (
    <button className="button" {...props} />
  )
}
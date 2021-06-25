import { ButtonHTMLAttributes } from "react";

import "../../styles/button.scss";

type ButtonsPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean,
};

export function Button({ isOutlined = false, ...props }: ButtonsPropsType) {
  return (
    <button 
      className={`button ${isOutlined && 'outlined'}`} 
      {...props}
    />
  )
}
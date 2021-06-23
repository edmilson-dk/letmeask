import { toast } from "react-toastify";
import copyImg from "../../assets/images/copy.svg";

import "../../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClickBoard() {
    navigator.clipboard.writeText(props.code);
    toast.info("Successfully copied code");
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClickBoard}>
      <div>
        <img src={copyImg} alt="Copy code"/>
      </div>
      <span>
        Sala {props.code}
      </span>
    </button>
  )
}
import React from "react";

import { QuestionsType } from "../../pages/Room";

export type UseRoomReturnTypes = {
  questions: QuestionsType[];
  roomTitle: string;
  setIsSendNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}
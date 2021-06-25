import { useEffect, useState } from "react";

import { database } from "../../services/firebase";
import { parseFirebaseQuestions } from "../../utils/parseFirebaseQuestions";
import { UseRoomReturnTypes } from "../../types/hooks/useRoom";
import { FirebaseQuestionsType, QuestionsType } from "../../types/pages/Room";

export function useRoom(roomId: string): UseRoomReturnTypes {
  const [isSendNewQuestion, setIsSendNewQuestion] = useState(false);
  const [roomTitle, setRoomTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionsType[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.once("value", room =>{
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestionsType = databaseRoom.questions ?? {};
      const parsedQuestions = parseFirebaseQuestions(firebaseQuestions);

      setRoomTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    if (isSendNewQuestion) {
      roomRef.once("child_added", room => {
        const databaseRoom = room.val();

        if (typeof databaseRoom !== "string") {
          const firebaseQuestions: FirebaseQuestionsType = databaseRoom ?? {};
          const parsedQuestions = parseFirebaseQuestions(firebaseQuestions);
          setQuestions(q => [...q, parsedQuestions[parsedQuestions.length-1]]);
        }

        setIsSendNewQuestion(false);
      });
    }
  }, [roomId, isSendNewQuestion]);

  return {
    questions,
    roomTitle,
    setIsSendNewQuestion
  }
}
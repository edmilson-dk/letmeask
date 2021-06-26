import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { database } from "../../services/firebase";
import { parseFirebaseQuestions } from "../../utils/parseFirebaseQuestions";
import { UseRoomReturnTypes } from "../../types/hooks/useRoom";
import { FirebaseQuestionsType, QuestionsType } from "../../types/hooks/useRoom";
import { useAuthContext } from "../useAuthContext";

export function useRoom(roomId: string): UseRoomReturnTypes {
  const { user } = useAuthContext();
  const history = useHistory();
  const [roomTitle, setRoomTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionsType[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", room =>{
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestionsType = databaseRoom.questions ?? {};
      
      if (databaseRoom.endedAt){
        if (databaseRoom.authorId !== user?.id) {
          toast.warning("This room has been closed by the administrator");
        }
        
        history.push("/");
        return;
      }

      const parsedQuestions = parseFirebaseQuestions(firebaseQuestions, user);
  
      setRoomTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => roomRef.off("value");
  }, [roomId, user, history]);

  return {
    questions,
    roomTitle,
  }
}
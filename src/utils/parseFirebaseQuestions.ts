import { UserType } from "../types/contexts/AuthContext";
import { FirebaseQuestionsType } from "../types/hooks/useRoom";

export function parseFirebaseQuestions(
  firebaseQuestions: FirebaseQuestionsType, 
  user: UserType | undefined,
  isChildAdded = false,
) {
  const receivedData = Object.entries(firebaseQuestions);
  const data = isChildAdded ? [receivedData[receivedData.length-1]] : receivedData;
 
  const parsedQuestions = data.map(([key, value]) => {
      return {
        id: key,
        content: value.content,
        author: value.author,
        isHighLighted: value.isHighLighted,
        isAnswered: value.isAnswered,
        likesCount: Object.values(value.likes ?? {}).length,
        likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
      }
    });

  return parsedQuestions;
}
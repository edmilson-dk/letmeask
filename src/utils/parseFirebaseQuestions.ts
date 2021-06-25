import { FirebaseQuestionsType } from "../types/pages/Room";

export function parseFirebaseQuestions(firebaseQuestions: FirebaseQuestionsType) {
  const parsedQuestions = Object.entries(firebaseQuestions)
    .map(([key, value]) => {
      return {
        id: key,
        content: value.content,
        author: value.author,
        isHighLighted: value.isHighLighted,
        isAnswered: value.isAnswered
      }
    });

  return parsedQuestions;
}
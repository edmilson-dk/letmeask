import React from "react";

export type FirebaseQuestionsType = Record<string, {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighLighted: string;
  isAnswered: string;
  likes: Record<string, {
    authorId: string;
  }>
}>

export type QuestionsType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighLighted: string;
  isAnswered: string;
  likesCount: number;
  likeId: string | undefined;
}

export type UseRoomReturnTypes = {
  questions: QuestionsType[];
  roomTitle: string;
}
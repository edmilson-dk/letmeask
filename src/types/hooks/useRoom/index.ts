import React from "react";

export type FirebaseQuestionsType = Record<string, {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighLighted: boolean;
  isAnswered: boolean;
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
  isHighLighted: boolean;
  isAnswered: boolean;
  likesCount: number;
  likeId: string | undefined;
}

export type UseRoomReturnTypes = {
  questions: QuestionsType[];
  roomTitle: string;
}
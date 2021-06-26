import { ReactNode } from "react";

export type QuestionPropsType = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
}
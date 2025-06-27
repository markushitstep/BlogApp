import { CommentData } from "./comment";

export interface BlogsData {
  id: string;
  title: string;
  text: string;
  comments?: CommentData[];
  createdAt?: Date;
}

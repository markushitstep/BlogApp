import { CommentData } from "./comment";

export interface BlogsData {
  id: string;
  title: string;
  content: string;
  comments?: CommentData[];
}

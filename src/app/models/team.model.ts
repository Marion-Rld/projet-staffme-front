import { Project } from "./project.model";
import { User } from "./user.model";

export interface Team {
  _id: string;
  name: string;
  users: User[];
  projects: Project[];
}

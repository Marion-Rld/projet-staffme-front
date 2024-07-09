import { Project } from "./project.model";

export interface Team {
  _id: string;
  name: string;
  users?: string[];
  projects?: Project[];
}

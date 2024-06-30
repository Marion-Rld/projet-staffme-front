import { Team } from './team.model';

export interface Project {
  _id?: string;
  name: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  teams: (Team | string)[];
}

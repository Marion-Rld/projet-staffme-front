export interface UserSkill {
  skill_id: string;
  level_id: string;
}

export interface User {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  job?: string;
  gender?: string;
  postalAddress?: string;
  role: string;
  skills?: UserSkill[];
  documents?: string[];
}

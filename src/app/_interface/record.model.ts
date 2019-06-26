import { User } from "./user";
export interface Record {
  id: string;
  user: string;
  action: string;
  dateOfAction: string;
  userDetail?: User;
}

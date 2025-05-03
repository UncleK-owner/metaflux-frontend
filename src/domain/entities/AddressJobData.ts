import { DateTimeFieldOwnerState } from "@mui/x-date-pickers/DateTimeField/DateTimeField.types";

export interface AddressJobData {
  id?: string;
  title: string;
  description: string;
  status: string;
  updatedAt?: Date;
  createdAt?: Date;
}
import { NewPatient, Gender } from "./types";
import { z } from "zod";

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.string()),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewEntrySchema.parse(object);
};

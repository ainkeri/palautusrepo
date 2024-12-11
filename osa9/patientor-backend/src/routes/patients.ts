import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { EntrySchema, NewEntrySchema } from "../utils";

import { z } from "zod";
import { Entry, EntryWithoutId, NewPatient, Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (_req, res) => {
  const patient = patientService.getPatientById(_req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Entry>
  ) => {
    const patientId = req.params.id;
    const addedEntry = patientService.addEntry(req.body, patientId);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;

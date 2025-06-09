"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { PatternFormat } from "react-number-format";

import { patientsTable } from "@/db/schema";

import PatientsTableActions from "./table-actions";

type Patient = typeof patientsTable.$inferSelect;

dayjs.extend(utc);

export const patientsTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "dateOfBirth",
    accessorKey: "dateOfBirth",
    header: "Data de nascimento",
    cell: (params) => {
      const patient = params.row.original;
      const dateOfBirth = patient.dateOfBirth;
      if (!dateOfBirth) return "";
      return dayjs.utc(dateOfBirth).format("DD/MM/YYYY");
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: (params) => {
      const patient = params.row.original;
      const phoneNumber = patient.phoneNumber;
      return (
        <PatternFormat
          value={phoneNumber}
          displayType="text"
          format="(##) #####-####"
        />
      );
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => {
      const patient = params.row.original;
      return patient.sex === "male" ? "Masculino" : "Feminino";
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const patient = params.row.original;
      return <PatientsTableActions patient={patient} />;
    },
  },
];

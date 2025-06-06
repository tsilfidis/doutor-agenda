"use client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import { PatternFormat } from "react-number-format";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

import { formatSex } from "../_helpers/format-sex";

dayjs.extend(utc);

type Patient = typeof patientsTable.$inferSelect;

export const PatientTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "dateOfBirth",
    accessorKey: "dateOfBirth",
    header: "Data de nascimento",
    cell: ({ row }) => {
      return dayjs.utc(row.original.dateOfBirth).format("DD/MM/YYYY");
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
    cell: ({ row }) => {
      return (
        <PatternFormat
          value={row.original.phoneNumber}
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
    cell: ({ row }) => {
      return formatSex(row.original.sex);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {row.original.name
                .split(" ")
                .filter((_, i, arr) => i === 0 || i === arr.length - 1)
                .join(" ")}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <EditIcon />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TrashIcon />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

"use client";

import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] =
    useState(false);

  const patientInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, "");
    // Format as (XX) XXXXX-XXXX
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const getSexLabel = (sex: "male" | "female") => {
    return sex === "male" ? "Masculino" : "Feminino";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">
              {getSexLabel(patient.sex)}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <Mail className="mr-1 h-3 w-3" />
          {patient.email}
        </Badge>
        <Badge variant="outline">
          <Phone className="mr-1 h-3 w-3" />
          {formatPhoneNumber(patient.phoneNumber)}
        </Badge>
        <Badge variant="outline">
          <User className="mr-1 h-3 w-3" />
          {getSexLabel(patient.sex)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-2">
        <Dialog
          open={isUpsertPatientDialogOpen}
          onOpenChange={setIsUpsertPatientDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertPatientForm
            patient={patient}
            onSuccess={() => setIsUpsertPatientDialogOpen(false)}
            isOpen={isUpsertPatientDialogOpen}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;

// "use client";

// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import { MailIcon, PhoneIcon, TrashIcon, User } from "lucide-react";
// import { useAction } from "next-safe-action/hooks";
// import { useState } from "react";
// import { toast } from "sonner";

// import { deletePatient } from "@/actions/delete-patient";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { patientsTable } from "@/db/schema";

// import { formatSex } from "../_helpers/format-sex";
// import UpsertPatientForm from "./upsert-patient-form";

// dayjs.extend(utc);

// interface PatientCardProps {
//   patient: typeof patientsTable.$inferSelect;
// }

// const PatientCard = ({ patient }: PatientCardProps) => {
//   const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] =
//     useState(false);

//   const deletePatientAction = useAction(deletePatient, {
//     onSuccess: () => {
//       toast.success("Paciente deletado com sucesso.");
//     },
//     onError: () => {
//       toast.error("Erro ao deletar paciente.");
//     },
//   });

//   const handleDeletePatientClick = () => {
//     if (!patient) return;
//     deletePatientAction.execute({ id: patient.id });
//   };

//   const patientInitials = patient.name
//     .split(" ")
//     .map((name) => name[0])
//     .slice(0, 2)
//     .join("");

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center gap-2">
//           <Avatar className="h-10 w-10">
//             <AvatarFallback>{patientInitials}</AvatarFallback>
//           </Avatar>
//           <div>
//             <h3 className="text-sm font-medium">{patient.name}</h3>
//             <p className="text-muted-foreground text-sm">
//               {dayjs.utc(patient.dateOfBirth).format("DD/MM/YYYY")}
//             </p>
//           </div>
//         </div>
//       </CardHeader>
//       <Separator />
//       <CardContent className="flex flex-col gap-2">
//         <Badge variant="outline">
//           <MailIcon className="mr-1" />
//           {patient.email}
//         </Badge>
//         <Badge variant="outline">
//           <PhoneIcon className="mr-1" />
//           {patient.phoneNumber}
//         </Badge>
//         <Badge variant="outline">
//           <User className="mr-1" />
//           {formatSex(patient.sex)}
//         </Badge>
//       </CardContent>
//       <Separator />
//       <CardFooter className="flex flex-col gap-2">
//         <Dialog
//           open={isUpsertPatientDialogOpen}
//           onOpenChange={setIsUpsertPatientDialogOpen}
//         >
//           <DialogTrigger asChild>
//             <Button className="w-full">Ver detalhes</Button>
//           </DialogTrigger>
//           <UpsertPatientForm
//             isOpen={isUpsertPatientDialogOpen}
//             defaultValues={patient}
//             onSuccess={() => setIsUpsertPatientDialogOpen(false)}
//           />
//         </Dialog>
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button variant="outline" className="w-full">
//               <TrashIcon />
//               Deletar paciente
//             </Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 Tem certeza que deseja deletar esse paciente?
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 Essa ação não pode ser revertida. Isso irá deletar o paciente e
//                 todas as consultas agendadas.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancelar</AlertDialogCancel>
//               <AlertDialogAction onClick={handleDeletePatientClick}>
//                 Deletar
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </CardFooter>
//     </Card>
//   );
// };

// export default PatientCard;

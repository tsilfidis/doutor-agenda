import { Stethoscope } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface TopDoctorsProps {
  doctors: {
    id: string;
    name: string;
    avatarImageUrl: string | null;
    specialty: string;
    appointments: number;
  }[];
}

export default function TopDoctors({ doctors }: TopDoctorsProps) {
  return (
    <Card className="mx-auto w-full p-6">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="text-muted-foreground" />
            <CardTitle className="text-base">Médicos</CardTitle>
          </div>
          <Link href="/doctors">
            <Button>Ver todos</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={doctor.avatarImageUrl || undefined}
                  alt={doctor.name}
                />
                <AvatarFallback className="text-primary bg-blue-100 font-medium">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm">{doctor.name}</h3>
                <p className="text-muted-foreground truncate text-sm">
                  {doctor.specialty}
                </p>
              </div>

              <div className="text-right">
                <span className="text-muted-foreground text-sm font-medium">
                  {doctor.appointments} agend.
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

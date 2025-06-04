import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignOutButton from "./_components/sign-uot-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });
  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div className="flex items-start px-2">
      <div className="mt-2 flex flex-col items-center gap-1">
        <Image
          src={session?.user?.image ?? ""}
          alt={session?.user?.name ?? ""}
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1>Dashboard</h1>
        <h1>{session?.user?.name}</h1>
        <h1>{session?.user?.email}</h1>
        <SignOutButton />
      </div>
    </div>
  );
};

export default DashboardPage;

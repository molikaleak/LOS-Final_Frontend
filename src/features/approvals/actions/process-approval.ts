"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function processApproval(id: string, action: "approve" | "reject", notes: string) {
  // Simulate network delay & saving to DB
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.log(`Processing ${action} for ${id} with notes: ${notes}`);

  // In a real app, you would insert into DB/Audit Log here.

  // Revalidate the approvals index and redirect
  revalidatePath("/approvals");
  redirect("/approvals");
}

"use server";

import { revalidatePath } from "next/cache";
import { productSchema, type ProductInput } from "../schemas/product-schema";
import { redirect } from "next/navigation";

export async function createProduct(data: ProductInput) {
  // Validate input
  const parsed = productSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Invalid product data.",
    };
  }

  // Simulate network delay & saving to DB
  await new Promise((resolve) => setTimeout(resolve, 800));

  console.log("Saving new product:", parsed.data);

  // In a real app, you would insert into DB here.

  // Revalidate the products index
  revalidatePath("/products");

  return { success: true, message: "Product created successfully!" };
}

import { getCategories } from "@/data/data";
import React from "react";
import CategoriesList from "./components/CategoriesList";
import AdminNav from "../components/AdminNav";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="flex flex-col gap-4">
      <AdminNav />
      <CategoriesList data={categories} />
    </div>
  );
}

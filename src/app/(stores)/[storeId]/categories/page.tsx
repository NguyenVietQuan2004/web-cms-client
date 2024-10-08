import { categoryAPI } from "@/apiRequest/categoryAPI";
import { handlError } from "@/components/handle-error";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import CategoriesClient from "@/app/(stores)/[storeId]/categories/categories-client";

interface CategoriesProps {
  params: { storeId: string };
}
async function getCategories(storeId: string) {
  let categories: ListCategoryResType | null = null;
  try {
    categories = await categoryAPI.getListCategory({ storeId });
  } catch (error) {
    handlError({
      consoleError: "GET_ALL_CATEGORY_ERROR",
      error,
    });
  }
  return categories;
}

export default async function Categories({ params }: CategoriesProps) {
  const categories = await getCategories(params.storeId);
  return (
    <div>
      <CategoriesClient listObjectCategory={categories} />
    </div>
  );
}

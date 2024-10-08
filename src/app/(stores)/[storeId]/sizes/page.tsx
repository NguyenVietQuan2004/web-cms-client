import { sizeAPI } from "@/apiRequest/sizeAPI";
import { ListSizeResType } from "@/Type/SizeTypes";
import { handlError } from "@/components/handle-error";
import SizesClient from "@/app/(stores)/[storeId]/sizes/sizes-client";

interface SizesProps {
  params: { storeId: string };
}

async function getSizes(storeId: string) {
  let sizes: ListSizeResType | null = null;

  try {
    sizes = await sizeAPI.getListSize({ storeId });
  } catch (error: any) {
    if (error.statusCode !== 400) {
      handlError({ consoleError: "GET_ALL_SIZE", error });
    }
  }
  return sizes;
}

export default async function Sizes({ params }: SizesProps) {
  const sizes = await getSizes(params.storeId);
  return (
    <div>
      <SizesClient listObjectSize={sizes} />
    </div>
  );
}

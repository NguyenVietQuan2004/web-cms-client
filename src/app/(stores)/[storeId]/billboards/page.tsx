import { cookies } from "next/headers";
import BillboardsClient from "./billboards-client";
import { ListBillboardResType } from "@/Type/BillboardTypes";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { handlError } from "@/components/handle-error";

interface BillboardProps {
  params: { storeId: string };
}

async function getBillboards(storeId: string) {
  let billboards: ListBillboardResType | null = null;

  try {
    const sessionToken = cookies().get("sessionToken")?.value || "";
    billboards = await billboardAPI.getListBillboard({ storeId, sessionToken });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_BILLBOARD", error });
  }
  return billboards;
}

export default async function Billboards({ params }: BillboardProps) {
  const billboards = await getBillboards(params.storeId);
  return (
    <div>
      <BillboardsClient listObjectBillboard={billboards} />
    </div>
  );
}

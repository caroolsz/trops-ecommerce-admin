import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

const SizePage = async ({
    params
}: {
    params: { sizeId: string }
}) => {
    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    }); // with this const, we now if we use a new form or a edit form


    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size} />
            </div>
        </div>
    );
}
 
export default SizePage;
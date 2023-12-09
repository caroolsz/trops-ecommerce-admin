import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const { userId } = auth(); // check if there's an user id

    if (!userId) { 
        redirect('/sign-in'); // if the user does not exist, then it redirects to the sign-in page
    }

    const store = await prismadb.store.findFirst({ // check if the store already exists -> loads the first store with the Id
        where: {
            id: params.storeId, // store id passed from the redirect on the (root) folder
            userId // the combinations confirms the creation of the store
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            {children} 
        </> // the children are in the (routes)/page.tsx
    )
}


import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout ({
    children
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth(); // when opened the localhost, it checks if there's some user loged

    if (!userId) { // if there is not, this happens
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({ // loads the first store available with the log of the user, if there is any
        where: {
            userId
        }
    });

    // redirect to the store with that same id 
    if (store) {
        redirect(`/${store.id}`); // {} = special object & {storeId} is the [storeId] on the (dashboard)
    }

    return (
        <>
            {children}
        </>
    )
}

import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
   "Acess-Control-Allow-Origin": "*",
   "Acess-Control-Allow-Methos":  "GET, POST, PUT, DELETE, OPTIONS",
   "Acess-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
};

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    const { productIds } = await req.json();

    if (!productIds || productIds.lenght === 0) {
        return new NextResponse("Product ids are required", { status: 400});
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    });

    
}

import {prisma} from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import PriceTag from "@/components/PriceTag"
import { Metadata } from "next"
import {cache} from "react";

interface ProductPageProps {
    params: {
        id: string,
    }
}

const getProduct = cache(async (id: string) =>{
    const product = await prisma.product.findUnique({where: {id}})
    if(!product) notFound();
    return product;
})

export async function generateMetadata( {params:{id}}:ProductPageProps): Promise<Metadata>{
    const product = await getProduct(id);
    return{
        title: product.name + " - DevilCart",
        description: product.description,
        openGraph:{
            images: [{url: product.imageUrl}]
        }
    }
}


export default async function ProductPage({params:{id}} : ProductPageProps){
  const product = await getProduct(id);
    return(
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Image src={product.imageUrl} alt={product.name} className="rounded-lg shadow-2xl" priority width={500} height={500}/>
            <div>
                <h1 className="text-5xl font-bold">
                    {product.name}
                </h1>
                <PriceTag className="mt-4" price={product.price}/>
                <p className="py-6">
                    {product.description}
                </p>
            </div>
        </div>
    )
}

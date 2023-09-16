"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/db/format";
import Image from "next/image";
import Link from "next/link";
import { setProductQuantity } from "./actions";
import { useTransition } from "react";


interface CartEntryProps {
    cartItem: CartItemWithProduct,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const quantityOptions: JSX.Element[] = [];

for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
        <option value={i} key={i}>
            {i}
        </option>
    )
}

export default function CartEntry({ cartItem: { product, quantity } }: CartEntryProps) {
    const [isPending, startTransistion] = useTransition();
    return (
        <div>
            <div className="flex flex-wrap items-centers gap-3">
                <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-lg" />
            </div>
            <div>
                <Link href={"/products/" + product.id} className="font-bold">{product.name}</Link>
            </div>
            <div>
                Price: {formatPrice(product.price)}
            </div>
            <div className="my-1 flex items-center gap-2">
                Quantity
                <select defaultValue={quantity} onChange={e => {
                    const newQuantity = parseInt(e.target.value);
                    startTransistion(
                        async () => {
                            await setProductQuantity(product.id, newQuantity);
                        }
                    )
                }} className="select select-bordered w-full max-w-[80px]">
                    <option value={0}>0 (remove) </option>
                    {quantityOptions}
                </select>
            </div>
            <div className="flex items-center gap-3">
                Total : {formatPrice(product.price * quantity)}
                {isPending && <span className="loading loading-spinner loading-sm"></span>}
            </div>

            <div className="divider" />
        </div>
    )
}
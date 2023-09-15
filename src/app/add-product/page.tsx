import FormSubmitButton from "@/components/FormSubmitButton";
import {prisma} from "../../lib/db/prisma"
import {redirect} from "next/navigation"
export  const metadata = {
    title: "Add product-Devil Cart",
}


async function addProduct(formData: FormData){
    "use server";
    const name = formData.get("name")?.toString()
    const description = formData.get("description")?.toString()	
    const imageUrl = formData.get("url")?.toString()
    const price =  Number(formData.get("price") || 0);
    
    if(!name || !description || !imageUrl || !price){
        throw Error("All fields are required")
    }
    
    await prisma.product.create({
        data:{name,description,imageUrl,price}
    });

    redirect("/");
}


export default function AddProductPage( ) {
    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            <form action={addProduct}>
                <input className="w-full mb-3 input input-bordered" required name="name" placeholder="Name"/>
                <input className="w-full mb-3 input input-bordered" required name="url" placeholder="url" type="url"/>
                <input className="w-full mb-3 input input-bordered" required name="price" placeholder="price" type="number"/>
                <textarea required placeholder="Description" name="description" className="textarea textarea-bordered mb-3 w-full"/>
                <FormSubmitButton className="btn-block" >Add Product</FormSubmitButton>
            </form>
        </div>
    )
}
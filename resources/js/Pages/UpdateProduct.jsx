import React from "react";
import Header from "@/Components/Header";
import ProductForm from "@/Components/ProductForm";

const UpdateProduct = ({ productToEdit }) => {
    const product_data = {
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        stock_quantity: productToEdit.stock_quantity,
        category: productToEdit.category,
        discount: productToEdit.discount,
        id: productToEdit.id,
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#F5F5F5]">
            <Header />
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <ProductForm product_data={product_data} toCreate={false}></ProductForm>
            </div>
        </div>
    );
};

export default UpdateProduct;

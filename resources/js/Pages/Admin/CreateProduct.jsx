import Header from "@/Components/Header";
import ProductForm from "@/Components/ProductForm";

const CreateProduct = () => {
    const product_data = {
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        category: "",
        discount:"",
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#F5F5F5]">
            <Header />
            <div className="flex flex-row items-center justify-center w-[1300px]">
                <ProductForm product_data={product_data} toCreate={true}></ProductForm>
            </div>
        </div>
    );
};

export default CreateProduct;

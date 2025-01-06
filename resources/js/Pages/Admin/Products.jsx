import Header from "@/Components/Header";
import ListProducts from "@/Components/ListProducts";
import SubHeader from "@/Components/SubHeader";
import { router } from "@inertiajs/react";

const Products = ({ productsData, searchTerm }) => {
    const handleSearchSubmit = (search) => {
        router.get(route("admin.products"), { search });
    };

    return (
        <>
            <Header />
            <SubHeader
                title={"Product"}
                placeholder={"Search by Name, Category"}
                onSearchSubmit={handleSearchSubmit}
                search={searchTerm}
                createLink={"/admin/create-product"}
            />
            <ListProducts
                products={productsData.original.data}
                pages={productsData.original.links}
                searchTerm={searchTerm}
            />
        </>
    );
};

export default Products;

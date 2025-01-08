import Header from "@/Components/Header";
import ListProducts from "@/Components/ListProducts";
import SubHeader from "@/Components/SubHeader";
import { router } from "@inertiajs/react";

const Products = ({
    productsData,
    searchTerm,
    sortBy,
    sortDirection,
    user,
}) => {
    const handleSearchSubmit = (search) => {
        router.get(route("admin.products"), { search, sortBy, sortDirection });
    };

    const handleSortChange = (sortBy, sortDirection) => {
        router.get(route("admin.products"), {
            search: searchTerm,
            sortBy,
            sortDirection,
        });
    };

    return (
        <>
            <Header isAdmin={true} user={user} />
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
                onSortChange={handleSortChange}
                sortBy={sortBy}
                sortDirection={sortDirection}
            />
        </>
    );
};

export default Products;

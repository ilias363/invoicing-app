import Header from "@/Components/Header";
import ListProducts from "@/Components/ListProducts";
import SubHeader from "@/Components/SubHeader";
import { router, usePage } from "@inertiajs/react";

const Products = ({ productsData, searchTerm, sortBy, sortDirection }) => {
    const handleSearchSubmit = (search) => {
        router.get(route(`${auth.user.role.name}.products`), { search, sortBy, sortDirection });
    };

    const { auth } = usePage().props;

    const handleSortChange = (sortBy, sortDirection) => {
        router.get(route(`${auth.user.role.name}.products`), {
            search: searchTerm,
            sortBy,
            sortDirection,
        });
    };

    return (
        <>
            <Header />
            <SubHeader
                title={"Product"}
                placeholder={"Search by Name, Category"}
                onSearchSubmit={handleSearchSubmit}
                search={searchTerm}
                createLink={`/${auth.user.role.name}/create-product`}
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

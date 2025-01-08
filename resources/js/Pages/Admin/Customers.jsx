import Header from "@/Components/Header";
import ListCustomers from "@/Components/ListCustomers";
import SubHeader from "@/Components/SubHeader";
import { router } from "@inertiajs/react";

const Customers = ({ customersData, searchTerm, sortBy, sortDirection }) => {
    const handleSearchSubmit = (search) => {
        router.get(route("admin.customers"), { search, sortBy, sortDirection });
    };

    const handleSortChange = (sortBy, sortDirection) => {
        router.get(route("admin.customers"), {
            search: searchTerm,
            sortBy,
            sortDirection,
        });
    };

    return (
        <>
            <Header />
            <SubHeader
                title={"Customer"}
                placeholder={"Search by Name"}
                onSearchSubmit={handleSearchSubmit}
                search={searchTerm}
                createLink={"/admin/create-customer"}
            />
            <ListCustomers
                customers={customersData.original.data}
                pages={customersData.original.links}
                searchTerm={searchTerm}
                onSortChange={handleSortChange}
                sortBy={sortBy}
                sortDirection={sortDirection}
            />
        </>
    );
};

export default Customers;

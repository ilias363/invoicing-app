import Header from "@/Components/Header";
import ListInvoices from "@/Components/ListInvoices";
import SubHeader from "@/Components/SubHeader";
import { router } from "@inertiajs/react";

const Invoices = ({
    invoicesData,
    searchTerm,
    sortBy,
    sortDirection,
    user,
}) => {
    const handleSearchSubmit = (search) => {
        router.get(route("admin.invoices"), { search, sortBy, sortDirection });
    };

    const handleSortChange = (sortBy, sortDirection) => {
        router.get(route("admin.invoices"), {
            search: searchTerm,
            sortBy,
            sortDirection,
        });
    };

    return (
        <>
            <Header isAdmin={true} user={user} />
            <SubHeader
                title={"Invoice"}
                placeholder={"Search by Customer, Status, Payment Status"}
                onSearchSubmit={handleSearchSubmit}
                search={searchTerm}
                createLink={"/admin/create-invoice"}
            />
            <ListInvoices
                invoices={invoicesData.original.data}
                pages={invoicesData.original.links}
                searchTerm={searchTerm}
                onSortChange={handleSortChange}
                sortBy={sortBy}
                sortDirection={sortDirection}
            />
        </>
    );
};

export default Invoices;

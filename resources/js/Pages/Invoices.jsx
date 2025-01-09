import Header from "@/Components/Header";
import ListInvoices from "@/Components/ListInvoices";
import SubHeader from "@/Components/SubHeader";
import { router, usePage } from "@inertiajs/react";

const Invoices = ({ invoicesData, searchTerm, sortBy, sortDirection }) => {
    const handleSearchSubmit = (search) => {
        router.get(route(`${auth.user.role.name}.invoices`), { search, sortBy, sortDirection });
    };
    const { auth } = usePage().props;
    const handleSortChange = (sortBy, sortDirection) => {
        router.get(route(`${auth.user.role.name}.invoices`), {
            search: searchTerm,
            sortBy,
            sortDirection,
        });
    };

    return (
        <>
            <Header />
            <SubHeader
                title={"Invoice"}
                placeholder={"Search by Customer, Status, Payment Status"}
                onSearchSubmit={handleSearchSubmit}
                search={searchTerm}
                createLink={`/${auth.user.role.name}/create-invoice`}
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

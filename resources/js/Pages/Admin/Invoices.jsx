import Header from "@/Components/Header";
import ListInvoices from "@/Components/ListInvoices";
import SubHeader from "@/Components/SubHeader";
import { router } from "@inertiajs/react";

const Invoices = ({ invoicesData, searchTerm }) => {
    const handleSearchSubmit = (search) => {
        router.get(route("admin.invoices"), { search });
    };

    return (
        <>
            <Header />
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
            />
        </>
    );
};

export default Invoices;

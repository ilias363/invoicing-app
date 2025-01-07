import Header from "@/Components/Header";
import ListCustomers from "@/Components/ListCustomers";
import SubHeader from "@/Components/SubHeader";
import { router } from "@inertiajs/react";

const Customers = ({ customersData, searchTerm,user }) => {
    const handleSearchSubmit = (search) => {
        router.get(route("admin.customers"), { search });
    };

    return (
        <>
            <Header isAdmin={true} user={user} />
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
            />
        </>
    );
};

export default Customers;

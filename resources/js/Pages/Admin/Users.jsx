import Header from "@/Components/Header";
import ListUsers from "@/Components/ListUsers";
import SubHeader from "@/Components/SubHeader";
import { router } from "@inertiajs/react";

const Users = ({ usersData, searchTerm, sortBy, sortDirection, user }) => {
    const handleSearchSubmit = (search) => {
        router.get(route("admin.users"), { search, sortBy, sortDirection });
    };

    const handleSortChange = (sortBy, sortDirection) => {
        router.get(route("admin.users"), {
            search: searchTerm,
            sortBy,
            sortDirection,
        });
    };

    return (
        <>
            <Header isAdmin={true} user={user} />
            <SubHeader
                title={"User"}
                placeholder={"Search by Name, Role"}
                onSearchSubmit={handleSearchSubmit}
                search={searchTerm}
                createLink={"/admin/create-user"}
            />
            <ListUsers
                users={usersData.original.data}
                pages={usersData.original.links}
                searchTerm={searchTerm}
                onSortChange={handleSortChange}
                sortBy={sortBy}
                sortDirection={sortDirection}
            />
        </>
    );
};

export default Users;

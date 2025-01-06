import Header from "@/Components/Header";
import ListUsers from "@/Components/ListUsers";
import SubHeader from "@/Components/SubHeader";
import { router } from "@inertiajs/react";

const Users = ({ usersData, searchTerm }) => {
    const handleSearchSubmit = (search) => {
        router.get(route("admin.users"), { search });
    };

    return (
        <>
            <Header />
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
            />
        </>
    );
};

export default Users;

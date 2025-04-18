import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { IoArrowDownOutline, IoArrowUpOutline, IoEyeOutline, IoPencilOutline, IoTrashOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { breadcrumbsAtom } from '../../../../atoms/breadcrumbs.atom'
import { Pill } from '../../../../components/Buttons'
import { Loader } from '../../../../components/Loader'
import { Paginator } from '../../../../components/Paginator'
import useUser from '../../../../hooks/useUser'
import { formatDateShort } from '../../../../utils/dateUtils'
import { UsersFilters } from './UsersFilters'
import { ConfirmModal } from '../../../../components/ConfirmModal'
import { userAtom } from '../../../../atoms/user.atom'

export const UsersManagement = () => {
    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom)
    const [myUser] = useAtom(userAtom);
    console.log(myUser);

    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    useEffect(() => {
        setBreadcrumbs([
            { label: "Usuarios", path: "/admin/users" }
        ])
    }, [setBreadcrumbs])

    const [sortBy, setSortBy] = useState<string>("creationDate");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const { users, handleLoadUsers, handlePageChange, handleDelete } = useUser();

    const handleSort = (field: string) => {
        const newOrder = sortBy === field ? (sortOrder === "asc" ? "desc" : "asc") : "asc";

        setSortBy(field);
        setSortOrder(newOrder);

        const sortParam = `${field},${newOrder}`;

        handleLoadUsers({
            page: 0,
            size: users.pagination.size,
            filters: {
                ...users.pagination.filters,
                sort: sortParam
            },
        });
    };

    useEffect(() => {
        handleLoadUsers({ page: 0, size: 5 });
    }, [handleLoadUsers])

    return <div className='w-full'>
        <UsersFilters />
        <Loader loading={users.loading}>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-neutral-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-neutral-700 dark:text-neutral-400">
                        <tr>
                            {[
                                { label: "Email", key: "email" },
                                { label: "Nombre", key: "name" },
                                { label: "Apellidos", key: "surnames" },
                                { label: "Teléfono", key: "telephone" },
                                { label: "Fecha de creación", key: "creationDate" },
                                { label: "Rol", key: "role" }
                            ].map(({ label, key }) => (
                                <th key={key} className="px-6 py-3 cursor-pointer select-none" onClick={() => handleSort(key)}>
                                    <span className="flex items-center gap-1">{label}
                                        {sortBy === key &&
                                            (sortOrder === "asc" ? <IoArrowUpOutline /> : <IoArrowDownOutline />)}
                                    </span>
                                </th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.content.map((user, index) => (
                            <tr key={index} className="bg-white dark:bg-neutral-600 border-b border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700">
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.surnames}</td>
                                <td className="px-6 py-4">{user.telephone}</td>
                                <td className="px-6 py-4">{formatDateShort(user.creationDate)}</td>
                                <td className="px-6 py-4">
                                    <Pill text={user.role.toString()}
                                        color={user.role.toString() === "ADMIN" ? "yellow" : user.role.toString() === "STAFF" ? "purple" : "blue"} />
                                </td>
                                <td className='px-6 py-4 flex items-center gap-3'>
                                    <Link to={`/admin/users/${user.id}`} className="cursor-pointer text-xl text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-100"><IoEyeOutline /></Link>
                                    {myUser.id !== user.id &&
                                        <>
                                            <Link to={`/admin/users/edit/${user.id}`} className="cursor-pointer text-xl text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-100"><IoPencilOutline /></Link>
                                            <button onClick={() => setUserToDelete(user.id)} className="cursor-pointer text-xl text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-100"><IoTrashOutline /></button>
                                        </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6">
                <Paginator totalElements={users.pagination.totalElements || 0} pageCount={users.pagination.totalPages || 1} page={users.pagination.page}
                    defaultSize={users.pagination.size} availableSizes={[5, 10, 15]} showSizes={true} onPageChange={handlePageChange}
                />
            </div>
        </Loader>

        <ConfirmModal
            isOpen={!!userToDelete}
            text="¿Estás seguro de eliminar al usuario?"
            type="negative"
            onConfirm={() => {
                if (userToDelete) handleDelete(userToDelete);
                setUserToDelete(null);
            }}
            onCancel={() => setUserToDelete(null)}
        />
    </div>
}

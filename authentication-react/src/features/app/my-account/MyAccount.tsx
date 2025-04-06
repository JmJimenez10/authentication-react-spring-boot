import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useAtom } from 'jotai';
import { breadcrumbsAtom } from '../../../atoms/breadcrumbs.atom';

export const MyAccount = () => {
    const { user } = useAuth();
    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);

    useEffect(() => {
        setBreadcrumbs([
            { label: "Mi cuenta", path: "/account" }
        ]);
    }, [setBreadcrumbs]);

    return <div className="w-1/2 bg-neutral-900 text-neutral-200 rounded-md p-20">
        <h1 className="text-3xl mb-7">Mi Cuenta</h1>

        <div className="flex flex-col gap-5">
            <div className="border-b border-neutral-400">
                <span className="text-xs text-neutral-400">Nombre</span>
                <p className="ml-2 mt-1">{user.name}</p>
            </div>
            <div className="border-b border-neutral-400">
                <span className="text-xs text-neutral-400">Apellidos</span>
                <p className="ml-2 mt-1">{user.surnames}</p>
            </div>
            <div className="border-b border-neutral-400">
                <span className="text-xs text-neutral-400">Email</span>
                <p className="ml-2 mt-1">{user.email}</p>
            </div>
            <div className="border-b border-neutral-400">
                <span className="text-xs text-neutral-400">Teléfono</span>
                <p className="ml-2 mt-1">{user.telephone}</p>
            </div>
        </div>
    </div>
}

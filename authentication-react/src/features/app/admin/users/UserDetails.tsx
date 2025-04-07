import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadUser } from '../../../../api/users.api';
import { breadcrumbsAtom } from '../../../../atoms/breadcrumbs.atom';
import { ConfirmModal } from '../../../../components/ConfirmModal';
import { Loader } from '../../../../components/Loader';
import useUser from '../../../../hooks/useUser';
import { IUser } from '../../../../types/User';
import { formatDate } from '../../../../utils/dateUtils';

export const UserDetails = () => {
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<IUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { handleDelete } = useUser();

  const handleLoadUser = useCallback(
    async () => {
      setLoading(true);

      try {
        const response = await loadUser(id!);
        if (response.status !== 200)
          navigate("/admin/users")

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading user:", error);
        setLoading(false);
      }
    }, [setUser, id, navigate]
  );

  useEffect(() => {
    if (!id)
      navigate("/admin/users")
    else
      handleLoadUser()
  }, [id, navigate, handleLoadUser])

  useEffect(() => {
    setBreadcrumbs([
      { label: "Usuarios", path: "/admin/users" },
      { label: "Detalles de usuario", path: `/admin/users/${id}` },
    ]);
  }, [id, setBreadcrumbs]);

  return <div className="md:w-3/4 p-10 lg:p-20 bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 rounded-md">
    <Loader loading={loading}>
      <h1 className="text-3xl mb-7">Detalles de Usuario</h1>

      <div className='flex flex-col lg:flex-row justify-evenly gap-14'>
        <div className="flex flex-col gap-5">
          <div className="border-b border-neutral-400">
            <span className="text-xs text-neutral-400">Email</span>
            <p className="ml-2 mt-1">{user?.email}</p>
          </div>
          <div className="border-b border-neutral-400">
            <span className="text-xs text-neutral-400">Nombre</span>
            <p className="ml-2 mt-1">{user?.name}</p>
          </div>
          <div className="border-b border-neutral-400">
            <span className="text-xs text-neutral-400">Apellidos</span>
            <p className="ml-2 mt-1">{user?.surnames}</p>
          </div>
          <div className="border-b border-neutral-400">
            <span className="text-xs text-neutral-400">Teléfono</span>
            <p className="ml-2 mt-1">{user?.telephone}</p>
          </div>
          <div className="border-b border-neutral-400">
            <span className="text-xs text-neutral-400">Rol</span>
            <p className="ml-2 mt-1">{user?.role}</p>
          </div>
          <div className="border-b border-neutral-400">
            <span className="text-xs text-neutral-400">Fecha de creación</span>
            <p className="ml-2 mt-1">{user?.creationDate && formatDate(user?.creationDate)}</p>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        text="¿Estás seguro de eliminar al usuario?"
        type="negative"
        onConfirm={() => handleDelete(id!)}
        onCancel={() => setModalOpen(false)}
      />
    </Loader>
  </div>
}

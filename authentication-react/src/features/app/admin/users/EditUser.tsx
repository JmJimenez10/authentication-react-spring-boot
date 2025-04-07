import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { loadUser, updateUser } from '../../../../api/users.api';
import { breadcrumbsAtom } from '../../../../atoms/breadcrumbs.atom';
import { MainButton } from '../../../../components/Buttons';
import { Input, Select } from '../../../../components/Forms';
import { Loader } from '../../../../components/Loader';
import { IUser } from '../../../../types/User';

export const EditUser = () => {
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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
      { label: "Editar usuario", path: `/admin/users/edit/${id}` }
    ])
  }, [setBreadcrumbs, id])

  const editSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    surnames: z.string().min(1, "Los apellidos son obligatorios"),
    email: z.string().email("El correo electrónico no es válido"),
    telephone: z.string().min(1, "El teléfono no es válido"),
    role: z.string().min(1, "El rol es obligatorio"),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setUser(prev => prev ? { ...prev, [id]: value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return

    setFieldErrors({});

    try {
      editSchema.parse({ ...user });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setFieldErrors(errors);
        return;
      }
    }

    const response = await updateUser(user);
    if (response)
      navigate(`/admin/users/${id}`);
  }

  return <div className="md:w-3/4 p-10 lg:p-20 bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 rounded-md">
    <Loader loading={loading}>
      <h1 className="text-3xl mb-7">Editar Usuario</h1>

      {user &&
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input label="Nombre"
            id="name"
            value={user.name}
            onChange={handleChange}
            fieldErrors={fieldErrors.name}
          />
          <Input label="Apellidos"
            id="surnames"
            value={user.surnames}
            onChange={handleChange}
            fieldErrors={fieldErrors.surnames}
          />
          <Input label="Email"
            id="email"
            value={user.email}
            type="email"
            onChange={handleChange}
            fieldErrors={fieldErrors.email}
          />
          <Input label="Teléfono"
            id="telephone"
            value={user.telephone}
            type="tel"
            onChange={handleChange}
            fieldErrors={fieldErrors.telephone}
          />
          <Select label="Rol"
            id="role"
            value={user.role}
            onChange={handleChange}
            options={[
              { label: 'Administrador', value: 'ADMIN' },
              { label: 'Personal', value: 'STAFF' },
              { label: 'Usuario', value: 'CUSTOMER' },
            ]}
            fieldErrors={fieldErrors.role}
            placeholderOption="Selecciona el rol"
          />

          <div className='mt-5 flex gap-5 items-center'>
            <MainButton text='Guardar cambios' type='submit' />
          </div>
        </form>
      }
    </Loader>
  </div>
}

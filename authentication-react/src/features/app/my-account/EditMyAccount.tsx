import { useAtom } from 'jotai';
import { breadcrumbsAtom } from '../../../atoms/breadcrumbs.atom';
import { userAtom } from '../../../atoms/user.atom';
import { useEffect, useState } from 'react';
import { MainLinkButton } from '../../../components/Buttons';
import { Loader } from '../../../components/Loader';
import { Input } from '../../../components/Forms';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../../../hooks/useAuth';

export const EditMyAccount = () => {
    const navigate = useNavigate();
    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
    const [user] = useAtom(userAtom);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        name: '',
        surnames: '',
        telephone: '',
        email: '',
        password: ''
    });

    const { updateProfile, error } = useAuth();

    const registrationSchema = z.object({
        name: z.string().min(1, "El nombre es obligatorio"),
        surnames: z.string().min(1, "Los apellidos son obligatorios"),
        email: z.string().email("El correo electrónico no es válido"),
        telephone: z.string().min(1, "El teléfono no es válido"),
        password: z.string().min(1, "Debes introducir tu contraseña actual"),
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                surnames: user.surnames || '',
                telephone: user.telephone || '',
                email: user.email || '',
                password: ''
            });
        }
    }, [user]);

    useEffect(() => {
        setBreadcrumbs([
            { label: "Mi cuenta", path: "/account" },
            { label: "Editar mis datos", path: `/account/edit` }
        ]);
    }, [setBreadcrumbs]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});

        try {
            registrationSchema.parse(formData);
            const { password, ...userData } = formData;

            const response = await updateProfile({ ...user, ...userData }, password);
            setFormData(prev => ({ ...prev, password: '' }));
            if (response)
                navigate("/account")

        } catch (err) {
            if (err instanceof z.ZodError) {
                const errors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    errors[error.path[0]] = error.message;
                });
                setFieldErrors(errors);
                return;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:w-3/4 p-10 lg:p-20 bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 rounded-md">
            <div className='flex items-center justify-between mb-7'>
                <h1 className="text-3xl">Editar Mi Cuenta</h1>
                <MainLinkButton url="/account" text="Volver" />
            </div>

            <Loader loading={loading}>
                <div className='flex flex-col lg:flex-row justify-evenly gap-14'>
                    <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row lg:gap-10'>
                        <div>
                            <Input
                                label="Nombre"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                fieldErrors={fieldErrors.name}
                            />
                            <Input
                                label="Apellidos"
                                id="surnames"
                                value={formData.surnames}
                                onChange={handleChange}
                                fieldErrors={fieldErrors.surnames}
                            />
                            <Input
                                label="Teléfono"
                                id="telephone"
                                value={formData.telephone}
                                type="tel"
                                onChange={handleChange}
                                fieldErrors={fieldErrors.telephone}
                            />
                        </div>
                        <div>
                            <Input
                                label="Email"
                                id="email"
                                value={formData.email}
                                type="email"
                                onChange={handleChange}
                                fieldErrors={fieldErrors.email}
                            />
                            <Input
                                label="Contraseña actual"
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                fieldErrors={fieldErrors.password}
                            />
                            <div>
                                <button type='submit' className='mt-6 p-2 bg-green-700 rounded-sm w-full'>
                                    Guardar cambios
                                </button>
                                {error && <p className="text-red-500 mt-3">{error}</p>}
                            </div>

                        </div>
                    </form>
                </div>
            </Loader>

            <Link to="" className="text-blue-500 underline text-sm">Cambiar contraseña</Link>
        </div>
    );
};
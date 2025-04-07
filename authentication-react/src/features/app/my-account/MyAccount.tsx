import { useEffect, useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useAtom } from 'jotai';
import { breadcrumbsAtom } from '../../../atoms/breadcrumbs.atom';
import { IoMoonOutline, IoSunnyOutline, IoTvOutline } from 'react-icons/io5';
import { MainLinkButton } from '../../../components/Buttons';

export const MyAccount = () => {
    const { user } = useAuth();
    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const dropdownThemeRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setBreadcrumbs([
            { label: "Mi cuenta", path: "/account" }
        ]);
    }, [setBreadcrumbs]);

    const [theme, setTheme] = useState<string>(() => {
        const storedTheme = localStorage.getItem("selectedTheme")
        if (storedTheme) return storedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    })

    const handleThemeSelection = (newTheme: string) => {
        localStorage.setItem("selectedTheme", newTheme);

        if (newTheme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            setTheme(systemTheme);
            if (systemTheme === "dark")
                document.documentElement.classList.add("dark");
            else
                document.documentElement.classList.remove("dark");
        } else {
            setTheme(newTheme);
            if (newTheme === "dark")
                document.documentElement.classList.add("dark");
            else
                document.documentElement.classList.remove("dark");
        }

        setThemeDropdownOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownThemeRef.current && !dropdownThemeRef.current.contains(event.target as Node))
                setThemeDropdownOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    return <div className="md:w-3/4 p-10 lg:p-20 bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 rounded-md">
        <div className='flex items-center justify-between mb-7'>
            <h1 className="text-3xl">Mi Cuenta</h1>
            <MainLinkButton url="/account/edit" text="Editar mis datos" />
        </div>

        <div className='flex flex-col lg:flex-row justify-evenly gap-14'>
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

            <div className="flex flex-col gap-5">
                <h2>Preferencias</h2>

                <div className='flex items-center gap-10'>
                    <span className="text-xs text-neutral-400">Tema</span>
                    <div className="relative" ref={dropdownThemeRef}>
                        <button title="Seleccionar tema" onClick={() => setThemeDropdownOpen(!themeDropdownOpen)} className="flex text-xl font-bold justify-center items-center gap-3 px-1 md:px-5 cursor-pointer hover:scale-110">
                            {theme === "dark" ? <IoMoonOutline className="size-5 md:size-7" />
                                : theme === "light" ? <IoSunnyOutline className="size-5 md:size-7" />
                                    : <IoTvOutline className="size-5 md:size-7" />}
                        </button>

                        <div className={`z-10 ${themeDropdownOpen ? "block" : "hidden"} bg-neutral-100 dark:bg-neutral-900 divide-y divide-gray-100 rounded-b-lg shadow-xl w-full absolute right-0 mt-3`}>
                            <ul className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                <li className="border-t border-dark block hover:bg-clear-gray text-black dark:text-white">
                                    <button title="Modo claro" className="cursor-pointer flex w-full h-full items-center justify-center gap-2 md:px-4 py-3" onClick={() => handleThemeSelection("light")}>
                                        <IoSunnyOutline className="size-4 md:size-6" />
                                    </button>
                                </li>
                                <li className="border-t border-dark block hover:bg-clear-gray text-black dark:text-white">
                                    <button title="Modo oscuro" className="cursor-pointer flex w-full h-full items-center justify-center gap-2 md:px-4 py-3" onClick={() => handleThemeSelection("dark")}>
                                        <IoMoonOutline className="size-4 md:size-6" />
                                    </button>
                                </li>
                                <li className="border-t border-dark block hover:bg-clear-gray text-black dark:text-white">
                                    <button title="Sistema" className="cursor-pointer flex w-full h-full items-center justify-center gap-2 md:px-4 py-3" onClick={() => handleThemeSelection("system")}>
                                        <IoTvOutline className="size-4 md:size-6" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

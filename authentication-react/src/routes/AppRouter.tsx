import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../features/home/Home';
import { LogIn } from '../features/auth/LogIn';
import { SignUp } from '../features/auth/SignUp';
import { NotFound } from '../features/not-found/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import { App } from '../features/app/App';
import { MyAccount } from '../features/app/my-account/MyAccount';

export const AppRouter = () => {

    const renderMultiRoutes = ({ element: Element, paths, ...rest }: { element: React.ReactElement; paths: string[];[key: string]: unknown }) => paths.map((path: string) => {
        return {
            ...rest,
            path, element: Element
        }
    });

    const router = createBrowserRouter([
        ...renderMultiRoutes({ paths: ['/home', '/'], element: <Home /> }),
        { path: '/login', element: <LogIn /> },
        { path: '/signup', element: <SignUp /> },
        { path: '*', element: <NotFound /> },

        {
            element: <ProtectedRoute allowedRoles={["ADMIN", "USER"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        {path: "/account", element: <MyAccount />},
                        // Rutas para todos los usuarios
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        // Rutas para administradores
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["USER"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        // Rutas para usuarios
                    ]
                }
            ]
        },
    ]);

    return <RouterProvider router={router} />;
};

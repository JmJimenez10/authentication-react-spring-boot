import queryString from "query-string";
import { ILoginResponse, ILoginUser, IRegisterUser, IUser } from "../types/User";
import httpClient from "../utils/httpClient";

const urlBase = "/users";

// Registro de usuario
export const registerUser = async (user: IRegisterUser) => {
  return await httpClient({
    url: `${urlBase}/auth/register`,
    method: "POST",
    data: user,
  });
};

// Login de usuario, especificando la respuesta como ILoginResponse
export const loginUser = async (user: ILoginUser) => {
  return await httpClient<ILoginResponse>({
    url: `${urlBase}/auth/login`,
    method: "POST",
    data: user,
  });
};

// Obtener perfil del usuario actual
export const getMyProfile = async () => {
  return await httpClient({
    url: `${urlBase}/profile`,
    method: "GET",
  });
};

// Cargar usuarios con paginación y filtros
export const loadUsers = async (page: number, size: number, filters?: Record<string, string | number | boolean>) => {
  return await httpClient({
    url: `${urlBase}/admin/users`,
    method: "GET",
    params: {
      page,
      size,
      ...filters,
    },
    paramsSerializer: (params: Record<string, unknown>): string => {
      return queryString.stringify(params, { arrayFormat: "comma" });
    },
  });
};

// Cargar un usuario específico
export const loadUser = async (userId: string) => {
  return await httpClient({
    url: `${urlBase}/admin/${userId}`,
    method: "GET",
  });
};

// Actualizar datos de un usuario
export const updateUser = async (user: IUser) => {
  return await httpClient({
    url: `${urlBase}/admin/update/${user.id}`,
    method: "PUT",
    data: user,
  });
};

// Actualizar perfil del usuario autenticado
export const updateMyProfile = async (userDTO: IUser, currentPassword: string) => {
  return await httpClient<ILoginResponse>({
    url: `${urlBase}/profile/update`,
    method: "POST",
    data: userDTO,
    params: {currentPassword}
  });
};

// Eliminar un usuario
export const deleteUser = async (userId: string) => {
  return await httpClient({
    url: `${urlBase}/admin/${userId}`,
    method: "DELETE",
  });
};

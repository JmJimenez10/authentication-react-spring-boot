# Proyecto de Autenticación - Frontend (React + Spring Boot)

Este es un proyecto base para gestionar la autenticación de usuarios usando **React** en el frontend y **Spring Boot** en el backend. El proyecto está diseñado para proporcionar una solución escalable y modular para la implementación de flujos de autenticación como **login** y **registro**.

## Requisitos previos

Asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- **Node.js** y **npm** (para gestionar las dependencias del frontend).
- **Java 17** (para ejecutar el backend de Spring Boot).
- **Maven** o **Gradle** (para gestionar las dependencias del backend).
- **Base de datos**: Puedes usar cualquier base de datos compatible con Spring Boot (por ejemplo, H2, MySQL, PostgreSQL).

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- **Frontend**: Usando **React** con **TypeScript**.
- **Backend**: Usando **Spring Boot** para la autenticación implementando JWT.

### Frontend

El frontend es responsable de la interacción del usuario y el manejo de las rutas para el login, registro y las páginas protegidas. Utiliza tecnologías modernas como **React** y **TailwindCSS** para los estilos.

- **Tecnologías**:
  - React
  - TypeScript
  - TailwindCSS
  - React Router para la navegación
  - Axios para realizar peticiones HTTP

### Backend

El backend está implementado con **Spring Boot** y se encarga de manejar la autenticación y autorización. Este backend utiliza JWT (JSON Web Tokens) para la gestión de la sesión de usuario.

- **Tecnologías**:
  - Spring Boot
  - Spring Security
  - JWT para autenticación
  - Base de datos relacional (MySQL)

## Instalación del Frontend

Sigue estos pasos para instalar y ejecutar el frontend:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/JmJimenez10/authentication-react-spring-boot.git
   cd authentication-react-spring-boot/authentication-react
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

## Instalación del Backend

Sigue estos pasos para instalar y ejecutar el backend:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/JmJimenez10/authentication-react-spring-boot.git
   cd authentication-react-spring-boot/authentication-spring-boot
   ```

2. **Configura la base de datos**:  
   Si usas una base de datos relacional, asegúrate de configurar las credenciales de la base de datos en el archivo application.properties en el directorio src/main/resources.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contribución
Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz un commit (git commit -am 'Agregada nueva funcionalidad').
4. Envía un pull request.
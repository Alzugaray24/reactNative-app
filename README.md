# E-Commerce React Native App

## Descripción

Esta aplicación de e-commerce está desarrollada en React Native y ofrece funcionalidades para la gestión de productos, carrito de compras, órdenes, favoritos y perfil de usuario. La aplicación permite a los usuarios navegar entre categorías de productos, gestionar su carrito, realizar órdenes, ver y gestionar productos favoritos, y actualizar su perfil.

## Tecnologías Utilizadas

- **React Native**: Framework para desarrollo de aplicaciones móviles.
- **Firebase**: Para persistir datos en la nube, incluyendo categorías, productos, órdenes de compras, autenticación y almacenamiento de imágenes de usuario.
- **SQLite**: Para almacenamiento local de datos del usuario y productos favoritos.
- **Expo**: Para el desarrollo y la administración de las dependencias.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. Instala las dependencias:
   ```bash
   npm install

3. Inicia el proyecto:
   ```bash
   npm start

## Funcionalidades
Shop: Navega entre categorías y productos. Visualiza detalles del producto.
Cart: Confirma órdenes y elimina ítems del carrito.
Order: Muestra las órdenes realizadas.
Favorite: Visualiza y gestiona productos favoritos.
Profile: Permite ver y editar datos del perfil, sacar una foto, ver la ubicación del address, y cerrar sesión.
Persistencia de Datos
Firebase: Utilizado para persistir datos en la nube, como categorías, productos, órdenes, y autenticación de usuarios.
SQLite: Utilizado para almacenamiento local de datos del usuario y productos favoritos.

## Notas Importantes
Este proyecto no es compatible con la web debido a la dependencia de SQLite, que no es compatible con entornos web.
Asegúrate de tener configurado correctamente tu proyecto de Firebase y las credenciales necesarias para que la autenticación y el almacenamiento funcionen correctamente.


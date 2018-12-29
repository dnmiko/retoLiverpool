# Primer ejercicio del reto liverpool

Backend del primer ejercicio del reto Liverpool

## Detalles del proyecto

- Desarrollado utilizando mLab para el hosting de la base de datos en MongoDB, Express, NodeJs y GraphQL para el manejo de la base de datos no relacional.
- Se generó un modelo para tener usuarios en el proyecto, los cuales pueden tener permisos de administrador o no. 
- Las contraseñas de los usuarios son encriptadas antes de ser enviadas a la base de datos y, por motivos de seguridad, nunca se desencriptan. Para intentar un login, se encripta la contraseña proporcionada por el usuario y se compara con la almacenada.
- Se utiliza JWT para la autenticación de los usuarios cuando realizan operaciones a la base de datos. El token generado es proporcionado al frontend y almacenado de manera local. Los tokens tienen una duración de 1 día.
- Se utiliza GraphQL para acceder a la información de la base de datos de manera mucho más sencilla y óptima.
- Conexión directa con el frontend de este primer ejercicio. Repositorio disponible [aquí](https://github.com/dnmiko/reto-liverpool).

## Estructura del proyecto

src/
    graphql/
        mutations/ (Contiene los métodos que alteran los objetos de la base de datos)
        queries/ (Contiene los métodos que obtienen información de la base de datos)
        types/ (Contiene los tipos que definen a los objetos de la base de datos)
    models/ (Contiene los modelos de los objetos de la base de datos)
    resolvers/ (Contiene los métodos que manejan los tokens de seguridad)
    server.js (Archivo principal que controla el proyecto)

## Créditos

Desarrollado por [Diego Fernando Cifuentes Jiménez](https://github.com/dnmiko) 


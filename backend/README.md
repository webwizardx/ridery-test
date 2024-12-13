# Proyecto Backend

## Instrucciones para clonar, configurar y ejecutar el proyecto en un entorno local

### Clonar el repositorio

```bash
git clone https://github.com/webwizardx/ridery-test.git
cd ridery-test/backend
```

### Configurar el entorno local

1. Tener instalado [Node.js version 22](https://nodejs.org/en/download/prebuilt-installer) y npm en tu máquina.
2. Tener instalado [MongoDB](https://www.mongodb.com/try/download/community) en tu máquina en el puerto 27017.
3. Crear un archivo `.env` en el directorio `backend` con las variables de entorno necesarias. Puedes usar el archivo `.env.example` como referencia.
4. Instalar las dependencias del proyecto:

```bash
npm install
```

5. De manera opcional, puedes ejecutar el script de inicialización de la base de datos:

```bash
npm run seed
```

### Ejecutar el proyecto

1. Iniciar el servidor de desarrollo:

```bash
npm run start
```

2. El proyecto estará disponible en `http://localhost:3000` si utilizas el puerto por defecto.

### Configurar el entorno con Docker (opcional)

1. Tener instalado [Docker](https://docs.docker.com/get-started/get-docker/) en tu máquina.
2. Ir al directorio raíz del proyecto:

```bash
cd ridery-test
```

3. Ejecutar el siguiente comando para construir y levantar los contenedores del backend, este comando también levantará un contenedor de MongoDB en el puerto 27017:

```bash
docker-compose up
```

4. El proyecto estará disponible en `http://localhost:3000` si utilizas el puerto por defecto.

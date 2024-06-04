FROM node:16

WORKDIR /usr/src/app

COPY /package*.json ./

# Instalar las dependencias de Node.js
RUN npm install

# Copiar el resto del código fuente de la aplicación
COPY . .

# Exponer el puerto utilizado por la aplicación
EXPOSE 6001

# Ejecutar la aplicación
CMD ["npm", "start"]

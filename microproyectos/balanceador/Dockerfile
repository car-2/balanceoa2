# Establece la imagen base como nginx:alpine
FROM nginx:alpine  

# Copia el archivo de configuración personalizado en el contenedor
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 en el contenedor
EXPOSE 80  

 # Define el comando para iniciar Nginx en el contenedor
CMD ["nginx", "-g", "daemon off;"] 

FROM node:21-alpine3.18
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "run", "dev"]


# # Etapa de producción
# FROM nginx:alpine

# # Copia los archivos construidos desde la etapa anterior
# COPY --from=build /usr/src/app/build /usr/share/nginx/html

# # Copia la configuración de nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Exponer el puerto en el que se ejecutará el servicio
# EXPOSE 3000

# # Comando para ejecutar nginx
# CMD ["nginx", "-g", "daemon off;"]

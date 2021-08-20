# especifica la version de node
FROM node:14-alpine3.12

#ejecucion de los comandos
WORKDIR /backend

#copia los archivos en el directorio principal
#COPY package.json package-lock.json /backend
COPY . .

RUN npm install --production

#comandos a ejecutar
CMD ["node", "backend/src/index.js"]

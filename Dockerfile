# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"] 
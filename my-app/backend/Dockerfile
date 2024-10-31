FROM node:14

WORKDIR /app

# Copie package.json et package-lock.json si disponible pour contrôler les versions
COPY package.json package-lock.json ./

# Installe les dépendances dans le conteneur Docker
RUN npm install

# Copie le reste du code de l'application
COPY . .

# Expose le port 3000
EXPOSE 3000

# Démarre l'application
CMD ["npm", "start"]

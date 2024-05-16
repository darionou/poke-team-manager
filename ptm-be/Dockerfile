# Usa un'immagine di Node.js ufficiale come base
FROM node:14

# Imposta la directory di lavoro
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dell'applicazione
COPY . .

# Compila TypeScript
RUN npm run build

# Espone la porta su cui l'applicazione sarà in esecuzione
EXPOSE 3000

# Comando per avviare l'applicazione
CMD ["npm", "start"]

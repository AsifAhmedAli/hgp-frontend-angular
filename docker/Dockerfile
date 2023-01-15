FROM node:14.17.0-alpine

WORKDIR /var/www

COPY package*.json ./

RUN npm install --quiet

# ENTRYPOINT ["sh","/etc/deploy-docker.sh"]

# EXPOSE 8003
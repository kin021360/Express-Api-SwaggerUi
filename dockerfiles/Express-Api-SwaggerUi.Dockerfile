FROM node:8
MAINTAINER Nathan Lam

# Install nginx
RUN curl http://nginx.org/keys/nginx_signing.key | apt-key add -
RUN echo "deb http://nginx.org/packages/debian/ jessie nginx" >> /etc/apt/sources.list
RUN echo "deb-src http://nginx.org/packages/debian/ jessie nginx" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y nano

# Copy nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/proxy-express.conf /etc/nginx/conf.d/proxy-express.conf

# Copy project
COPY . /home/Express-Api-SwaggerUi

# Update npm
RUN npm install -g npm@latest

# Install npm modules
RUN (cd /home/Express-Api-SwaggerUi && npm install)

# Install & config pm2 module
# RUN npm install -g pm2
# RUN pm2 install pm2-intercom
# RUN pm2 install pm2-logrotate
# RUN pm2 set pm2-logrotate:retain 100

# Execute command
# CMD nginx; pm2-docker start /home/Express-Api-SwaggerUi/pm2-config.json
CMD nginx; npm start --prefix /home/Express-Api-SwaggerUi
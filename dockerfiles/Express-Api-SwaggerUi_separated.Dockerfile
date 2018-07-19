FROM node:8
MAINTAINER Nathan Lam

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
# CMD pm2-docker start /home/Express-Api-SwaggerUi/pm2-config.json
CMD npm start --prefix /home/Express-Api-SwaggerUi
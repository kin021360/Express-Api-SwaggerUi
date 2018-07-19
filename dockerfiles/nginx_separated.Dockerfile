FROM nginx
MAINTAINER Nathan Lam

# Copy nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/proxy-express_separated.conf /etc/nginx/conf.d/proxy-express_separated.conf

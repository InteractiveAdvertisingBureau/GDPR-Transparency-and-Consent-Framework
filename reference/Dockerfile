FROM node:9.11.1
MAINTAINER Hao Xu <hao@sharethis.com>

# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade

ADD package.json /tmp/package.json
ADD .npmrc /root/.npmrc
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /app
ADD . /app

# build the app
RUN npm run build

# start server
CMD npm run dev

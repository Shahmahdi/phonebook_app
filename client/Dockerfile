# Use leightweight linux distrubution
# Choose alpine because it's size only 5MB 
FROM node:current-slim

# RUN apk add nodejs=12.14.0-r0
# RUN apk add --no-cache --virtual .gyp python make g++ 
# RUN apk add --update nodejs
# RUN npm cache verify
# RUN npm install yarn -g


# Add Maintainer info
# LABEL maintainer="tigrowtecheven@gmail.com"

# avoid container running as 'root'
# RUN addgroup -S tigrow && adduser -S -G tigrow tigrow

# set /app directory as default working directory
WORKDIR /app

# taking advantages of docker layer cache system
ADD package.json /app/package.json

# install all desired packages 
RUN yarn install

#for production
# RUN npm ci --only=production

# copy all file from current dir to /app in container
COPY . /app

# expose port 4044
EXPOSE 3000

# cmd to start service
CMD [ "yarn", "start" ]
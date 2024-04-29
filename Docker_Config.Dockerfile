FROM node:20-alpine


#Create working directory
WORKDIR /app

#Install app dependancy
COPY package.json ./

#Run npm install
RUN npm install

#Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

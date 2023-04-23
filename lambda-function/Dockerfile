FROM public.ecr.aws/lambda/nodejs:18

# Update npm
RUN npm i -g npm@9.6.5

# Copy your function's source code and package.json into the container
#TODO: could we use a command to reference the files when testing and copying them when running in production?
COPY ./domain ./domain
COPY ./lambda-function/app.js package.json ./

# Install NPM dependencies
RUN npm install

# Set the Lambda function handler as the entry point
CMD [ "app.handler" ]

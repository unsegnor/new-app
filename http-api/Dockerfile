FROM node:18

COPY ./http-api ./http-api
COPY ./domain ./domain
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm i
CMD [ "node", "./http-api/start.js" ]

HEALTHCHECK --interval=1s --timeout=1s --retries=5 CMD [ "node", "healthcheck.js" ]

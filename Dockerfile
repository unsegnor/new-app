FROM node:18

COPY . .
RUN npm i
CMD [ "node", "httpapi.js" ]

HEALTHCHECK --interval=1s --timeout=1s --retries=5 CMD [ "node", "healthcheck.js" ]

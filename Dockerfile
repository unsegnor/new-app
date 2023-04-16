FROM node:18

COPY . .
RUN npm i
EXPOSE 3000
CMD [ "node", "httpapi.js" ]

HEALTHCHECK --interval=1s --timeout=1s --retries=5 CMD [ "node", "healthcheck.js" ]

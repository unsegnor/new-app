FROM node:18

COPY . .
RUN npm i
EXPOSE 3000
CMD [ "node", "httpapi.js" ]

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node healthcheck.js

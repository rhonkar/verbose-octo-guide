FROM node:22-alpine

WORKDIR /usr/src/app

# install curl for healthchecks and install dependencies
COPY package.json ./
RUN apk add --no-cache curl && npm install --production && rm -rf /var/cache/apk/*

# copy app
COPY ./src/index.js ./

# non-root user
RUN addgroup -S app && adduser -S -G app app
USER app

ENV NODE_ENV=production
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "index.js"]

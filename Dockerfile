FROM node:24-alpine AS builder
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:24-alpine AS runner
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=builder /app/build build/
RUN addgroup --system --gid 1001 musang
RUN adduser --system --uid 1001 musang
USER musang

EXPOSE 3000
ARG ORIGIN
ENV ORIGIN=$ORIGIN
ENV NODE_ENV=production
CMD ["node", "build"]

FROM oven/bun:1 AS base
FROM base AS install

WORKDIR /app
COPY . .
RUN bun install

WORKDIR /app/frontend
RUN bun install
COPY ./dist/* /app/dist/
WORKDIR /app

ENV PORT=8080

EXPOSE 8080

# CMD ["bun", "run", "db/prepare.ts", "&&",  "bun", "run", "index.ts"]
CMD ["./setup.sh"]


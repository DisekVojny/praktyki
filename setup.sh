rm -rf ./dist/*
cd ./frontend
bun run build
cp -r ./dist/ ../
cd ..
bun run ./index.ts

bun run db/prepare.ts
bun run index.ts
rm -rf ./dist/*
cd ./frontend
bun run build
cp -r ./dist/ ../
cd ..
bun run ./index.ts
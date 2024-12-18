@echo off
rmdir /s /q .\dist
mkdir dist
cd .\frontend
bun run build
xcopy .\dist ..\dist /E /H /C /I
cd ..
bun run .\index.ts
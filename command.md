yarn init -y
yarn add -D typescript ts-node @types/node
npx tsc --init

tsconfig.json
npx ts-node index.ts

```json
"compilerOptions": {
    "target": "es5",
    "lib": ["DOM", "ESNext"],
    "experimentalDecorators": true
}
```

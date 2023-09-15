yarn init -y
yarn add -D typescript ts-node @types/node
npx tsc --init

tsconfig.json

```json
"compilerOptions": {
    "target": "es5",
    "lib": ["DOM", "ESNext"],
    "experimentalDecorators": true
}
```

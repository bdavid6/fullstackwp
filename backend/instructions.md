# Setup the environment

Initialise node project :

```ps
npm init --yes
```

Install developer dependencies :

```ps
npm i --save-dev typescript ts-node nodemon
```

Initialise typescrip :

```ps
npx tsc --init
```

Add a node script called **start** :

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon src/index.ts"
  },
```

Install dependencies :

```ps
npm i --save express
```

Install `body-parser` dependency :
```ps
npm i --save body-parser
```
```ps
npm i --save-dev @types/body-parser
```

Install types :

```ps
npm i --save-dev @types/express @types/node
```

Add to `tsconfig.json` file :

```json
{
  "esModuleInterop": true,
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
}
```

Setup database :
```ps
npm i --save @mikro-orm/core @mikro-orm/sqlite
```
```ps
npm i --save-dev @mikro-orm/cli
```

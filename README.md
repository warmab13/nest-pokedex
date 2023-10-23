<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute in development

1. Clone repository.
2. Execute
```
yarn install
````
3.- Have Nest CLI installed
```
npm i -g @nestjs/cli
````
4.- Get up database
```
docker-compose up -d
```

5.- Clonar el archivo ```.env.template``` and rename copy to __.env.__

6.- Fill enviroment variables define on ```.env```

7.- Start nest server
```
yarn start:dev
```
8.- Rebuild database using seed
```
http://localhost:3000/api/v2/seed
```

## Used Stack
* Mongodb
* Nest
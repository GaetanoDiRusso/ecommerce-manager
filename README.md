## Ecommerce manager

### React application with a NodeJS backend and a MongoDB database

Project structure:
```
.
├── backend
│   ├── src
│   │   ├── auth
│   │   ├── order
│   │   │   ├── application
│   │   │   ├── data
│   │   │   ├── domain
│   │   │   └── infraestructure
│   │   ├── item
│   │   ├── ...
│   │   └── user
│   ├── Dockerfile
│   ...
├── frontend
│   ├── data
│   ├── domain
│   ├── components
│   ├── pages
│   ├── stores
│   ├── ...
│   └── Dockerfile
├── compose.yaml
└── README.md

```

## Run the Frontend, Backend and MongoDB, using the Docker compose
In the root repository, execute the docker compose:
```
docker compose up -d
```

## Backend Docs endpoint
- http://localhost:3000/api-docs
![Screenshot](swagger_docs.png)

## Frontend images
- http://localhost:3001
```
email: admin@email.com
password: admin1234
```
![Screenshot](dashboard_1.png)
![Screenshot](dashboard_2.png)

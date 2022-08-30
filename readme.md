# Config

copy **.env.template**, then rename it to **.env**

```
NODE_ENV=development
APP_PORT=3000

MONGODB_URI=mongodb://127.0.0.1:27017/sample_db

JWKS_BASE_URL=http://localhost:3000
JWT_AUDIENCE=http://localhost:3000
JWT_ISSUER="Localhost"
JWT_ACCESS_TOKEN_EXPIRATION=120
JWT_REFRESH_TOKEN_EXPIRATION=600
# default JWK is asymmetric
# JWK_TYPE=symmetric
```

# How to Run

**local**

```
yarn dev
```

**Docker local**

```
yarn docker:dev
```

# API Documentation

```
http://localhost:3000/v1/docs
```

# Walkthrough

For step by step will be explained in the screenshot images

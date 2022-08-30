### Run

**Config .env file**

copy .env.template, then rename it to .env

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

**Run local**

```
yarn dev
```

**Run docker local**

```
yarn docker:dev
```

**Open Swagger**

```
http://localhost:3000/v1/docs
```

### Step

For step by step will be explained in the screenshot images

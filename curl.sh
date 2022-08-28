# CURL symmetric

curl -X POST \
  'http://localhost:3000/v1/jwk/symmetric/add' \
  -H 'Content-Type: application/json' \
  -d '{"kid": "sym1"}'

curl -v -X POST \
  'http://localhost:3000/v1/jwk/symmetric/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "role": "admin"
}'

curl -v -X POST \
  'http://localhost:3000/v1/jwk/symmetric/verify' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaXNzIjoiTG9jYWxob3N0IiwiZXhwIjoxNjYxNjk2ODk1fQ.m4AE0prk_iV6MEbDMj5j2oL_BfhAI58b_b--cmCSJBU"
  }' | json_pp

# CURL asymmetric

curl -v -X POST \
  'http://localhost:3000/v1/jwk/asymmetric/add' \
  -H 'Content-Type: application/json' \
  -d '{"kid":"asym1"}'
curl -v -X POST \
  'http://localhost:3000/v1/jwk/asymmetric/add' \
  -H 'Content-Type: application/json' \
  -d '{"kid":"asym2"}'
curl -v -X POST \
  'http://localhost:3000/v1/jwk/asymmetric/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 2,
  "role": "admin"
}' | json_pp

curl -v -X POST \
  'http://localhost:3000/v1/jwk/asymmetric/verify' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImFzeW0xIn0.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJzdWIiOjEsInJvbGVzIjpbImEiLCJiIl0sImV4cCI6MTY2MjcyNjg1Nn0.rhtnfT1EWBHmeOjlg_9Ne8sVTAtiVk-xXFDWpa6frfx9Ve79cc6FTBaJn7FqHW2zMApa0cesYSLMw3Rs97XY9phzLsa4jEr_ITJ14MlkiSM3-YlWEhW0Do6SjjAPh7cnAh6keuSNBg0E_55XbGJCAaYlUA7Dt05aWnugwRBl5e-drDt32sZUHqKKOFv6_A0nRaNeT9f2DM41b-1AVkCUPJVfw0he-Oo7WlDQWcDEmWpPswP-QofifRpKs0uisKEAil85814MjCqU86dmdsWLaN04DFDamL7aP_SokS7-yHBmwjaRPAt5ZMZ93c6Jfrl7yKmy_ee0uQb4I8GOO2ZjjA"
  }' | json_pp
curl -v -X POST \
  'http://localhost:3000/v1/jwk/asymmetric/verify' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImFzeW0yIn0.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJzdWIiOjIsInJvbGVzIjpbImEiLCJiIl0sImV4cCI6MTY2MjcyNjkwNH0.tF8zaKQernQIMQcHuInS_LKNDSZyO-ovnHaXfkTGVjFLPiZOOF4zEGdXh5BF5GvRHrdFakn14OH1nlR-HgedoIp89ugJjUk_5POCq_w3h_cO_DUe4iZGQ1QyILtebnl_NtHLP3np_vpt8OJBsWM78vTe70y7TRtTPk0E2fA0UrlRD7w2eP9LALqxEs7gXhw5TVuhps8_sNlhvWhn9UHv00VCq1pW5vlrcMERQ2DTXU7kqOlDtG0CApV7csy74ZujrFdRL7xzpIIEVYNLRRBh12GOCIX56nWu-tHGbcdylQ20NP82ymqsVUP1aRg5pm1V69mjiHD1KCHV8RrbLeQHgA"
  }' | json_pp
curl -X DELETE 'http://localhost:3000/v1/jwk/asymmetric'

# CURL login

curl -v -X POST \
  'http://localhost:3000/v1/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "john.doe@example.com",
    "password": "12345678"
  }' | json_pp
# {
#    "access_token" : "eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4N2YiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6IlN1cGVyIEFkbWluIiwic2NvcGVzIjpbImNyZWF0ZTpwcm9kdWN0cyIsInJlYWQ6cHJvZHVjdHMiLCJ1cGRhdGU6cHJvZHVjdHMiLCJkZWxldGU6cHJvZHVjdHMiLCJjcmVhdGU6dXNlcnMiLCJyZWFkOnVzZXJzIiwidXBkYXRlOnVzZXJzIiwiZGVsZXRlOnVzZXJzIl0sImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImlzcyI6IkxvY2FsaG9zdCIsImV4cCI6MTY2MTcwNjEzNn0.r8I1xyUpPhofMogl5s53xweuF7etDMScSzCzqIO0iUI",
#    "refresh_token" : "eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4N2YiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJleHAiOjE2NjE3MTE1MzZ9.Cg2It7Yiy-G0gioZM0wa6poC_yGI3aVML4Hy25gER5g"
# }
curl -v -X POST \
  'http://localhost:3000/v1/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "john.doe@example.com",
    "password": "12345678"
  }' | json_pp
# {
#    "access_token" : "eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4N2YiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6IlN1cGVyIEFkbWluIiwic2NvcGVzIjpbImNyZWF0ZTpwcm9kdWN0cyIsInJlYWQ6cHJvZHVjdHMiLCJ1cGRhdGU6cHJvZHVjdHMiLCJkZWxldGU6cHJvZHVjdHMiLCJjcmVhdGU6dXNlcnMiLCJyZWFkOnVzZXJzIiwidXBkYXRlOnVzZXJzIiwiZGVsZXRlOnVzZXJzIl0sImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImlzcyI6IkxvY2FsaG9zdCIsImV4cCI6MTY2MTcwNjIwN30.quXNJu7venCgL5PMhw4bk_l4qJBBbKasad2MlTg6eg4",
#    "refresh_token" : "eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4N2YiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJleHAiOjE2NjE3MTE2MDd9.muYu_MRd-XZ8CMFkt96pksuiC4dy3dV4z6OXgK6YAAE"
# }
curl -v -X POST \
  'http://localhost:3000/v1/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "richard.roe@example.com",
    "password": "12345678"
  }' | json_pp
# {
#    "access_token" : "eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4ODEiLCJlbWFpbCI6InJpY2hhcmQucm9lQGV4YW1wbGUuY29tIiwicm9sZSI6IlN0YWZmIiwic2NvcGVzIjpbImNyZWF0ZTpwcm9kdWN0cyIsInJlYWQ6cHJvZHVjdHMiXSwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaXNzIjoiTG9jYWxob3N0IiwiZXhwIjoxNjYxNzA4MDk3fQ.zYmBt1lFjfJOY2JD1a7pSK4XMSgAv24bG0AMBp6Eye0",
#    "refresh_token" : "eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4ODEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJleHAiOjE2NjE3MTM0OTd9.0AOmOpxAxP8mAtz3MpszWxF95cUwXlpU_yZkRIvBmIU"
# }

curl -v -X POST \
  'http://localhost:3000/v1/auth/refresh-token' \
  -H 'Content-Type: application/json' \
  -d '{
    "refresh_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4ODEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJleHAiOjE2NjE3MTE2NTN9.Yq_89y2zVbhzF3-Qhv0J0JenZej6bdsCQah6AE_2NHk"
  }' | json_pp

# CURL users

curl -v -X POST 'http://localhost:3000/v1/users/seed' | json_pp

curl -v GET 'http://localhost:3000/v1/users' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4ODEiLCJlbWFpbCI6InJpY2hhcmQucm9lQGV4YW1wbGUuY29tIiwicm9sZSI6IlN0YWZmIiwic2NvcGVzIjpbImNyZWF0ZTpwcm9kdWN0cyIsInJlYWQ6cHJvZHVjdHMiXSwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaXNzIjoiTG9jYWxob3N0IiwiZXhwIjoxNjYxNzA4MDk3fQ.zYmBt1lFjfJOY2JD1a7pSK4XMSgAv24bG0AMBp6Eye0' | json_pp
curl -v GET 'http://localhost:3000/v1/users/6308f1557a454f011ae98897' | json_pp

curl -v -X POST \
  'http://localhost:3000/v1/users' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "12345678",
    "role": "admin"
  }'  | json_pp

curl -v -X POST \
  'http://localhost:3000/v1/users' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Staff 1",
    "email": "staff1@example.com",
    "password": "12345678",
    "role": "staff"
  }'  | json_pp
curl -v -X POST \
  'http://localhost:3000/v1/users' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Staff 2",
    "email": "staff@example.com",
    "password": "12345678",
    "role": "staff"
  }'  | json_pp
curl -v -X POST \
  'http://localhost:3000/v1/users' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Staff 3",
    "email": "staff3@example.com",
    "password": "12345678",
    "role": "staff"
  }'  | json_pp 
curl -v -X PATCH \
  'http://localhost:3000/v1/users/6308f4346f79e7827a25a81f' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "staff2@example.com"
  }'  | json_pp

curl -v -X DELETE 'http://localhost:3000/v1/users/6308f4b8327b5e226b5ea793'

# CURL products

curl -v GET 'http://localhost:3000/v1/products' | json_pp
curl -v GET 'http://localhost:3000/v1/products/630aa4f0e5212ee8c51ac923' | json_pp
curl -v GET 'http://localhost:3000/v1/products/630aa536e5212ee8c51ac92b' | json_pp

curl -v -X POST \
  'http://localhost:3000/v1/products' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Product1",
    "sku": "sku001",
    "price": 500000
  }'  | json_pp
curl -v -X POST \
  'http://localhost:3000/v1/products' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Product2",
    "sku": "sku001",
    "price": 100000
  }'  | json_pp
curl -v -X POST \
  'http://localhost:3000/v1/products' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Product2",
    "sku": "sku002",
    "price": 100000
  }'  | json_pp
curl -v -X PATCH \
  'http://localhost:3000/v1/products/630aa536e5212ee8c51ac92b' \
  -H 'Content-Type: application/json' \
  -d '{
    "price": "550000"
  }'  | json_pp

curl -v -X DELETE 'http://localhost:3000/v1/products/630aa536e5212ee8c51ac92b'

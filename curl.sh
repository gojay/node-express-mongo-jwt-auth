# CURL symmetric

curl -X POST \
  'http://localhost:3000/api/symmetric/add' \
  -H 'Content-Type: application/json' \
  -d '{"kid": "sym1"}'

curl -v -X POST \
  'http://localhost:3000/api/symmetric/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "roles": ["a","b"]
}'

curl -v -X POST \
  'http://localhost:3000/api/symmetric/verify' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJzdWIiOjEsInJvbGVzIjpbImEiLCJiIl0sImV4cCI6MTY2MjcyNTcxMn0.7p0EHwOdLt4jZ4gH360k5qOYv418HxdU8ibdupibbPI"
  }' | json_pp

# CURL asymmetric

curl -v -X POST \
  'http://localhost:3000/api/asymmetric/add' \
  -H 'Content-Type: application/json' \
  -d '{"kid":"asym1"}'
curl -v -X POST \
  'http://localhost:3000/api/asymmetric/add' \
  -H 'Content-Type: application/json' \
  -d '{"kid":"asym2"}'
curl -v -X POST \
  'http://localhost:3000/api/asymmetric/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 2,
  "roles": ["a","b"]
}' | json_pp

curl -v -X POST \
  'http://localhost:3000/api/asymmetric/verify' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImFzeW0xIn0.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJzdWIiOjEsInJvbGVzIjpbImEiLCJiIl0sImV4cCI6MTY2MjcyNjg1Nn0.rhtnfT1EWBHmeOjlg_9Ne8sVTAtiVk-xXFDWpa6frfx9Ve79cc6FTBaJn7FqHW2zMApa0cesYSLMw3Rs97XY9phzLsa4jEr_ITJ14MlkiSM3-YlWEhW0Do6SjjAPh7cnAh6keuSNBg0E_55XbGJCAaYlUA7Dt05aWnugwRBl5e-drDt32sZUHqKKOFv6_A0nRaNeT9f2DM41b-1AVkCUPJVfw0he-Oo7WlDQWcDEmWpPswP-QofifRpKs0uisKEAil85814MjCqU86dmdsWLaN04DFDamL7aP_SokS7-yHBmwjaRPAt5ZMZ93c6Jfrl7yKmy_ee0uQb4I8GOO2ZjjA"
  }' | json_pp
curl -v -X POST \
  'http://localhost:3000/api/asymmetric/verify' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImFzeW0yIn0.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJzdWIiOjIsInJvbGVzIjpbImEiLCJiIl0sImV4cCI6MTY2MjcyNjkwNH0.tF8zaKQernQIMQcHuInS_LKNDSZyO-ovnHaXfkTGVjFLPiZOOF4zEGdXh5BF5GvRHrdFakn14OH1nlR-HgedoIp89ugJjUk_5POCq_w3h_cO_DUe4iZGQ1QyILtebnl_NtHLP3np_vpt8OJBsWM78vTe70y7TRtTPk0E2fA0UrlRD7w2eP9LALqxEs7gXhw5TVuhps8_sNlhvWhn9UHv00VCq1pW5vlrcMERQ2DTXU7kqOlDtG0CApV7csy74ZujrFdRL7xzpIIEVYNLRRBh12GOCIX56nWu-tHGbcdylQ20NP82ymqsVUP1aRg5pm1V69mjiHD1KCHV8RrbLeQHgA"
  }' | json_pp
curl -X DELETE 'http://localhost:3000/api/asymmetric'

# CURL users

curl -v GET 'http://localhost:3000/api/users' | json_pp
curl -v GET 'http://localhost:3000/api/users/6308f1557a454f011ae98897' | json_pp

curl -v -X POST \
  'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "12345678",
    "role": "admin"
  }'  | json_pp

curl -v -X POST \
  'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Staff 1",
    "email": "staff1@example.com",
    "password": "12345678",
    "role": "staff"
  }'  | json_pp
curl -v -X POST \
  'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Staff 2",
    "email": "staff@example.com",
    "password": "12345678",
    "role": "staff"
  }'  | json_pp
curl -v -X POST \
  'http://localhost:3000/api/users' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Staff 3",
    "email": "staff3@example.com",
    "password": "12345678",
    "role": "staff"
  }'  | json_pp 
curl -v -X PATCH \
  'http://localhost:3000/api/users/6308f4346f79e7827a25a81f' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "staff2@example.com"
  }'  | json_pp

curl -v -X DELETE 'http://localhost:3000/api/users/6308f4b8327b5e226b5ea793'

# CURL products

curl -v GET 'http://localhost:3000/api/products' | json_pp
curl -v GET 'http://localhost:3000/api/products/630aa4f0e5212ee8c51ac923' | json_pp
curl -v GET 'http://localhost:3000/api/products/630aa536e5212ee8c51ac92b' | json_pp

curl -v -X POST \
  'http://localhost:3000/api/products' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Product1",
    "sku": "sku001",
    "price": 500000
  }'  | json_pp
curl -v -X POST \
  'http://localhost:3000/api/products' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Product2",
    "sku": "sku001",
    "price": 100000
  }'  | json_pp
curl -v -X POST \
  'http://localhost:3000/api/products' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Product2",
    "sku": "sku002",
    "price": 100000
  }'  | json_pp
curl -v -X PATCH \
  'http://localhost:3000/api/products/630aa536e5212ee8c51ac92b' \
  -H 'Content-Type: application/json' \
  -d '{
    "price": "550000"
  }'  | json_pp

curl -v -X DELETE 'http://localhost:3000/api/products/630aa536e5212ee8c51ac92b'

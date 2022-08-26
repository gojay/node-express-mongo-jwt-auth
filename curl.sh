curl -X POST \
  'http://localhost:3000/api/symmetric/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "roles": ["a","b"]
}'

curl -X POST \
  'http://localhost:3000/api/symmetric/verify' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsImtpZCI6InNpbTEifQ.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJzdWIiOjEsInJvbGVzIjpbImEiLCJiIl0sImV4cCI6MTY2MTQ0MzYyNX0._jhIZYEpJ6tFSFKKK61s1EchNkqttB1Az32ZvoMGP-o"
  }'

curl -X POST \
  'http://localhost:3000/api/asymmetric/add' \
  -H 'Content-Type: application/json' \
  -d '{"kid":"asym1"}'
curl -X POST \
  'http://localhost:3000/api/asymmetric/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "roles": ["a","b"]
}'

curl -X POST \
  'http://localhost:3000/api/asymmetric/verify' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImFzeW0xIn0.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJzdWIiOjEsInJvbGVzIjpbImEiLCJiIl0sImV4cCI6MTY2MTQ3MTE1NX0.ZB2T9kNeahacO-_BBlyrv_VqxNTZwF5UyJdw6_VwZhhVRNsV68YsyaZu8ow51nyjUwy5SJSqnIoitABWHEUDiMwLZ9PeB2fSOhvV96v2zmsLQ1BlRseKN5IwP3Z3VKIK3yjupEz4H5oA4dogsShVFN33FE2s8AMVIZVKQNYhr8PSl5BDKucFX6WnFTOmsQKOs2JqM_bZMnLTb_OTYO6UgPjGbyK2JzYSqC8d21PfkQjnv5StUFsx7_H_84sRm2s3R-9Cc39zMc43lpeoaXTh8BoIdv1N8UE8HIdDtq4tutZMOtEVn3RX4THAE1H0lHVv8Gk4ZCaOauu6keNes2KA3g"
  }'

curl -X POST \
  'http://localhost:3000/api/asymmetric/verify' \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImFzeW0xIn0.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJzdWIiOjEsInJvbGVzIjpbImEiLCJiIl0sImV4cCI6MTY2MTQ3NTAxNH0.iAstAaf6jfUNp_m2fPyjfrXzc3fqu1P55dWfKTTf-VkBknw-G0VvFBSvzKwd4URGOsmFrKnrGMLthY5ap_iGx_fRjMjLdcTpnvYqMZrGBTsXQuFT5yibDbvKIXFiBalARXI1VB4-O9amqfEI6sh7jB4SYoWzfVagUPZmNTDmtRjPpGJB6miP2S8Tzg8weRHUtSBhhOCepVTi1yizN5o2x-aQmJrMhC6CMqqGYf_xxyZDI4CBDoyfK198WbDb-ayfDlUAwTfD73xoyPH0RvPGREwyfpB-nItyy9JOynwlgjMzuxXypqxpxJMjf1U5PMwzYl6zrDjsC6GvPFKVguQGVg"
  }'

curl -v GET 'http://localhost:3000/api/users' | json_pp
curl -v GET 'http://localhost:3000/api/users/6308f1557a454f011ae98897' | json_pp
curl -v GET 'http://localhost:3000/api/users/6308f4b8327b5e226b5ea793' | json_pp
curl -v -X DELETE 'http://localhost:3000/api/users/6308f4b8327b5e226b5ea793'

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
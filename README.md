# API Documentation

## Introduction

This API gives developers the ability to integrate your inventory into their own applications.  
It allows external apps to access, manage, and synchronize inventory data easily through a set of RESTful endpoints.

## Authentification

This API uses two authentication mechanisms:

### 1. Developer Authentication (JWT)

Developers must authenticate using JSON Web Tokens (JWT) to manage their account.  
Include the token in the request header:

```http
Authorization: Bearer <your_jwt_token>
```

### 2. Application Access (API Key)

Applications can access inventory data using an API key.
Include the API key in the request header:

```http
x-api-key: <your_api_key>
```

## Endpoints

### Users

#### `POST /signup`

**Description**: Signup and get a jwt token

**Body Parameters**
`username`:required / string
`email`:required / email
`password`:required / string / min 8 length / at least one uppercase letter / at least one lowercase letter / at least one number / at least one special character

**Response Example:**
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF4ZWwiLCJzdWIiOjUsImlhdCI6MTc1ODg4ODk5OCwiZXhwIjoxNzU4ODg5MDU4fQ.K6apeu2BG5P6TuSi_OUdD_b5sVyGGc-HYjd4CG5Q4rE

#### `POST /signin`

**Description**: Signin and get a jwt token

**Body Parameters**
`username`:required / string
`password`:required / string

**Response Example:**
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF4ZWwiLCJzdWIiOjUsImlhdCI6MTc1ODg4ODk5OCwiZXhwIjoxNzU4ODg5MDU4fQ.K6apeu2BG5P6TuSi_OUdD_b5sVyGGc-HYjd4CG5Q4rE

### Appp

#### `POST /`

**Description**:Create a new app

**Authentification**:`Authorization: Bearer <your_jwt_token>`

**Body Parameters**
`name` : required / string
`user_id` : required / integer

**Response Example**

```json
{
  "id": 1,
  "name": "testApp",
  "api_key": "",
  "items": [],
  "user": "userId",
  "create_at": "Date"
}
```

### Items

#### `POST /`

**Descritpion**:Create a new item

**Authentification**:`x-api-key: <your_api_key>`

**Body Parameters**
`name` : required / string
`quantity` : required / integer
`app_user_id` : required / string
`options` : optional / json

**Response Example**

```json
{
  "id": 2,
  "app": "",
  "app_user_id": "",
  "name": "",
  "quantity": 3,
  "options": {},
  "create_at": "",
  "delete_at": null
}
```

#### `GET /findWithAppUserId/:id`

**Description**:Find all items that have the same app user id

**Authentification**:`x-api-key: <your_api_key>`

**Paramaters**
`id`:required/string

**Response Example**

```json
[
  {
    "id": 2,
    "app": "",
    "app_user_id": "",
    "name": "",
    "quantity": 3,
    "options": {},
    "create_at": "",
    "delete_at": null
  },
  {
    "id": 2,
    "app": "",
    "app_user_id": "",
    "name": "",
    "quantity": 3,
    "options": {},
    "create_at": "",
    "delete_at": null
  }
]
```

#### `GET /getAllAppUserId`

**Description**:Get all app user id for this app

**Authentification**:`x-api-key: <your_api_key>`

**Response Example**
["23","42"]

#### `PATCH /softDelete/:id`

**Description**:Soft delete a item

**Authentification**:`x-api-key: <your_api_key>`

**Paramaters**
`id`:required/string

**Response Example**

```json
{
  "id": 2,
  "app": "",
  "app_user_id": "",
  "name": "",
  "quantity": 3,
  "options": {},
  "create_at": "",
  "delete_at": null
}
```

#### `PATCH /updateQty/:id`

**Description**:Update the quantity of an item

**Authentification**:`x-api-key: <your_api_key>`

**Paramaters**
`id`:required / string

**Body Parameteres**
`quantity`: required / string

**Response Example**
```json
{
  "id": 2,
  "app": "",
  "app_user_id": "",
  "name": "",
  "quantity": 3,
  "options": {},
  "create_at": "",
  "delete_at": null
}
```

## License

This API is licensed under the MIT License.

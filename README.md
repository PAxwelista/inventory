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

### Apps

#### `POST /`

**Description**:Create a new app

**Authentification**:`Authorization: Bearer <your_jwt_token>`

**Body Parameters**
`name` : required / string
`user_id` : required / integer

**Response Example**

```json
{
  "id": 25,
  "name": "test3",
  "api_key": "c6aa2ac2ea11ed35aec4cb0b68ff0e8c554ba65c02cca47da33f0de4cfab5839",
  "user": {
    "id": 7,
    "username": "Axel",
    "email": "Axel@gma.com",
    "password": "$2b$10$UmqYJlKcFTHYue2kFMBNBOXrV4VhPaGX4hEUpcdsco/pE242akayy",
    "created_at": "2025-09-26T15:01:30.805Z"
  },
  "created_at": "2025-09-26T15:03:29.330Z"
}
```

#### `GET /`

**Description**:Get all apps

**Authentification**:`Authorization: Bearer <your_jwt_token>`

**Response Example**

```json
[
  {
    "id": 23,
    "name": "test",
    "api_key": "b8b8bab960dd281ba2cb169cd4f68025a6c6145b0fae956cdcadd9214a27f2d6",
    "created_at": "2025-09-26T15:01:57.898Z"
  }
]
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
  "id": 3,
  "app": {
    "id": 23,
    "name": "test",
    "api_key": "b8b8bab960dd281ba2cb169cd4f68025a6c6145b0fae956cdcadd9214a27f2d6",
    "created_at": "2025-09-26T15:01:57.898Z"
  },
  "app_user_id": "321",
  "name": "Carots",
  "quantity": 3,
  "options": null,
  "created_at": "2025-09-26T15:05:42.702Z",
  "delete_at": null
}
```

#### `GET /findWithAppUserId/:id`

**Description**:Find all items that have the same app user id

**Authentification**:`x-api-key: <your_api_key>`

**Query Paramaters**
`id`:required/string

**Response Example**

```json
[
  {
    "id": 3,
    "app_user_id": "321",
    "name": "Carots",
    "quantity": 3,
    "options": null,
    "created_at": "2025-09-26T15:05:42.702Z",
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

**Query Paramaters**
`id`:required/string

**Response Example**

```json
{
  "id": 3,
  "app_user_id": "321",
  "name": "Carots",
  "quantity": 3,
  "options": null,
  "created_at": "2025-09-26T15:05:42.702Z",
  "delete_at": "2025-09-26T15:08:15.123Z"
}
```

#### `PATCH /updateQty/:id`

**Description**:Update the quantity of an item

**Authentification**:`x-api-key: <your_api_key>`

**Query Paramaters**
`id`:required / string

**Body Parameteres**
`quantity`: required / string

**Response Example**

```json
{
  "id": 3,
  "app_user_id": "321",
  "name": "Carots",
  "quantity": 2,
  "options": null,
  "created_at": "2025-09-26T15:05:42.702Z",
  "delete_at": null
}
```

## License

This API is licensed under the MIT License.

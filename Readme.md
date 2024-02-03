# JWT Authentication with Express

This is a simple Node.js and Express application demonstrating JWT (JSON Web Token) authentication. The application includes user login functionality, token generation, and a protected route that requires a valid JWT for access.

## Installation

1. **Clone this repository.**

   ```bash
   git clone https://github.com/spm999/JWT-Nodejs.git


## Installation

1. **Navigate to the project directory.**

    ```bash
    cd JWT-Nodejs
    ```

2. **Install dependencies.**

    ```bash
    npm install
    ```

## Usage

1. **Start the server.**

    ```bash
    npm start
    ```

2. **Access the server at [http://localhost:3000](http://localhost:3000).**

## Endpoints

### User Login

- **URL:** `/login`
- **Method:** `POST`
- **Description:** Allows users to log in and obtain a JWT token.
- **Request Body:** Should include a JSON object with `username` and `password`.
- **Response:** Returns a JWT token if the login is successful.

### Protected Route

- **URL:** `/protected`
- **Method:** `GET`
- **Description:** A protected route that requires a valid JWT for access.
- **Authorization Header:** Should include a Bearer token obtained during login.
- **Response:** Returns a message indicating successful access to the protected route if the token is valid.

## JWT Authentication

The application uses a simple in-memory user database and a secret key for JWT signature. In a real-world scenario, replace the in-memory database with a proper database, and keep the secret key secure.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.


# Live Website
https://mern-9-q16y.onrender.com/

# About
# 🔐 Secrets Web Application

## 🚀 Objective

The **Secrets** web app is built to demonstrate secure user authentication and robust session management using modern web practices. It provides a safe environment for users to register, log in, and manage their personal secrets with confidence, emphasizing **data protection** and **security best practices**.

## 📌 Features & Functionality

### 📝 User Registration

* **Secure Sign-Up Process**:
  Users register with their **name, email**, and **password**.

* **Email Validation**:
  Ensures users enter a correctly formatted email address.

* **Password Rules**:
  Passwords must include:

  * At least one **lowercase letter**
  * At least one **uppercase letter**
  * At least one **number**
  * Minimum length of **6–8 characters**

* **Password Security**:
  Passwords are hashed using a **secure hashing algorithm** before being stored in the database.

* **Post-Registration**:
  Successful registration redirects users to the **Login Page**.

### 🔐 Login Mechanism

* **Email & Password Login**:
  Users log in using valid credentials with proper format validation.

* **Protected Access**:
  After successful login, users are redirected to a **protected page** displaying user-specific information.

### 🧠 Session Management

* **Secure Cookies**:
  User sessions are maintained via **HttpOnly** and **Secure** cookies to prevent access via client-side scripts.

* **JWT (JSON Web Tokens)**:
  Implements **token-based authentication** for stateless session management, enabling scalability and enhanced security.

### 🚪 Logout

* **Safe Logout**:
  User session is cleared, and the app redirects back to the **Login Page**.

## 🛡️ Security Highlights

* Input validation on both frontend and backend
* Passwords never stored in plaintext
* Sessions protected against client-side attacks
* Token-based authentication allows for stateless scaling

## 📂 Tech Stack

* **Frontend**: HTML, CSS (or Tailwind), JavaScript
* **Backend**: Node.js, Express.js
* **Authentication**: JWT, Cookies
* **Database**: MongoDB (if used)
* **Security**: bcrypt, Helmet, and other best practices

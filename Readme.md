# Blog EJS

A full-featured blog application built using **Node.js**, **Express.js**, **MongoDB**, and **EJS** as the templating engine. This app allows users to sign up, log in, create and edit blogs, and upload profile pictures.

📂 **Note:** Profile pictures are uploaded and stored on disk using `multer` with `diskStorage`.

## 🚀 Features

- 🔐 User Authentication (Signup & Login)
- 📝 Create, Edit, and Delete Blog Posts
- 👤 User Profile with Profile Picture Upload
- 📜 View Blogs by Logged-in User
- 🖼️ EJS-based Templating for Dynamic Views

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Templating Engine:** EJS
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT(jsonwebtoken), bcrypt
- **File Uploads:** Multer

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ishantmishra03/blog-ejs.git
cd blog-ejs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory with the following content:

```.env
PORT=3000
MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_session_secret"
```

### 4. Start the Server

```bash
npm start
```

Open your browser and go to: [http://localhost:3000](http://localhost:3000)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to fork this repo and submit a pull request.

---

> Made  by [@ishantmishra03](https://github.com/ishantmishra03)

# Todo List

> ## Table of Contents
- [Project Information](#project-information)
- [Documentation](#documentation)
    - [Project Setup](#project-setup)
    - [Development Instructions](#development-instructions)
    - [Deployment Instructions](#deployment-instructions)

Welcome to the Todo List Project!\
It's built using Webpack to manage assets and streamline the development process.\
It uses the localStorage and sessionStorage in order to save useful data.

***Link to Project:*** https://ginakoul.github.io/todo-list/

The Todo List contains the following functionalities:

- **View all Projects**

- **Add Project**

- **Remove Project**

- **Edit Project**

- **View Project with tasks:**

- **Add Task**

- **Remove Task**

- **Edit Task**

- **Change Task Status**

- **Change Check List Item Status**

Each project contains the following:

- **Title**

Each task contains the following:

- **Title**

- **Description**

- **Due Date**

- **Priority**

- **Notes**

- **Check List**

> ## Project information

**Version:** 1.0.0\
**Last Build:** 19/02/2025

**Technologies Used:**

- **Webpack:** For bundling and compiling assets.
- **HTML, CSS, and JavaScript:** Core web technologies used to build the page.
- **[Git](https://pages.github.com/):** For version control.

> ## Documentation

### Project Setup

To get started with the project, you’ll need to clone the repository and install the dependencies.

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project folder:

```bash
cd todo-list
```

3. Install dependencies:

```bash
npm install
```

Once the dependencies are installed, you're all set to start working on the project!

### Development Instructions

During development, you can use the following command to start the development server:

```bash
npm run dev
```

This will compile and bundle your assets, launching a local development server.\
The project will be accessible in your browser at http://localhost:8080 by default.\
It automatically reloads the page whenever you make changes to the source files.

### Deployment Instructions

Once you've finished development and are ready to deploy your changes, follow these steps:

1. Add all changes:

```bash
git add .
```

2. Commit your changes:

```bash
git commit -m "<Your commit message>"
```

3. Push your changes to the main branch:

```bash
git push origin main
```

4. Check the status: Make sure there are no uncommitted changes by running:

```bash
git status
```

5. Deploy the changes. Run the following command to deploy:

```bash
npm run deploy
```

This will push the compiled and minified assets to the [gh-pages](https://github.com/GinaKoul/todo-list/tree/gh-pages) branch.
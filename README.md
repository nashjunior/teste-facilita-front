# Teste Vaga Facilita

## This project is currently

### under construction, and here's a brief overview

## Project Overview

### A company that cleans homes faces challenges in managing its customers and is looking for an efficient solution to register and visualize information that is currently controlled in spreadsheets. To centralize information and help the company expand, it wants a platform where it can manage its customers. The system must consist of a backend in Node.js using PostgreSQL as the database, and a frontend in React.

## Relates To

- [Backend](https://github.com/nashjunior/teste-facilita)

## Technologies used:

- Chakr/UI.
- Axios
- Eslint
- Prettier
- Vite
- @ReduxJS/Toolkit
- I18n
- Yup

### Command to run FrontEnd (Requires NodeJS>=20)

1. git checkout develop
2. Install the packages
    - npm
      ```bash
      npm i
      ```
    - yarn
      ```bash
      yarn
      ```
3. Set your .env like
    ```bash
    VITE_API_BASE_URL =http://<your-ip>:<your-port (default - 4000)>
    ```
4. Build the project
    - npm
      ```bash
      npm run build
      ```
    - yarn
      ```bash
      yarn build
      ```
6. Run the project
    - Production
      ```bash
      npx serve
      ```
    - Development
      - npm
        ```bash
          npm run build
        ```
      - yarn
        ```bash
        yarn build
        ```
## Approach

This api is constructed using a mono repo.
See the api in
```bash
http://<your-ip>:<port>/documentation
```


### Folder structure

```bash
├── src
│ ├── actions
│ ├── components
│ │ │ ├── datatable
│ │ │ ├── form
│ │ │ ├── layout
│ ├── assets
│ ├── config
│ │ │ ├── languages
│ ├── definitions
│ ├── pages
│ │ │ ├── users
│ ├── routes
│ ├── selectors
│ ├── stores
│ ├── validations
│ ├── App.tsx
│ ├── main.ts
```

- actions - action creators that can describe changes in the application state
- components - the component folder
  - layout - high order component that handles the default layout page
- assets - store static assets such as images, fonts, stylesheets, or any other files that are    not part of the JavaScript source code
- config - configurations folder
  - languages - stores the internationalization of the application
- definitions - the definitions folder where it is used for the whole applicaiton
- pages - the application views
- routes - the route logic
- validations - where the field validation it is stored.
- app.tsx - entry point for the main React application
- main.tsx - start the main rendering process


# Portfolio Website

This project is a React-based portfolio built with Vite and Tailwind CSS.

## Project Structure

This repository uses a specific branching strategy to handle GitHub User Pages (`username.github.io`):

| Branch | Purpose | Content |
|--------|---------|---------|
| `dev`  | **Source Code** | The actual React/Vite source code. **Make all edits here.** |
| `master` | **Live Site** | The built production files (`dist` folder). **Do not edit directly.** |

> **Note**: GitHub User Pages always serves from the `master` (or `main`) branch by default. To allow this, we keep the source code on `dev` and deploy the built site to `master`.

## How to Develop

1.  Make sure you are on the `dev` branch:
    ```bash
    git checkout dev
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the local development server:
    ```bash
    npm run dev
    ```

## How to Deploy

To update the live website:

1.  Commit your changes to the `dev` branch.
2.  Run the deployment script:
    ```bash
    npm run deploy
    ```

This script will automatically:
1.  Build the project (`npm run build`).
2.  Push the contents of the `dist` folder to the `master` branch.

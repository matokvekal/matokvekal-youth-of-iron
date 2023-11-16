# Words of Iron app

## Setting up Environment Variables

The application uses several environment variables for configuration. We use `@t3-oss/env-nextjs` along with `zod` to validate these variables.

### Required Environment Variables

1. **Server-Side**
    - `API_URL`: The API endpoint URL.
    - `APP_PUBLIC_URL`: The application's public URL.

2. **Shared**
    - `NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING`: Connection string for Azure App Insights.

### Steps to Setup Environment Variables

#### Option 1: Using `.env` file

1. Create a file named `.env` in the root directory of the project.
2. Add the environment variables like so:

    ```env
    API_URL=(get it from the team)
    APP_PUBLIC_URL=http://localhost:3000
    NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING=(can be empty)
    ```

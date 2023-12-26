/// <reference types="vite/client" />

interface ImportMetaEnv {
  // App
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_FAVICON_URL: string;
  readonly VITE_APP_DEV_SERVER_PORT: string;

  // Deploy Site URL
  readonly VITE_APP_SITE_RENDER_URL: string;

  // Firebase
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_DATABASE_URL: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
  readonly VITE_MEASUREMENT_ID: string;

  // Auth0
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

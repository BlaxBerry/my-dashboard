# Dashboard SPA

## Description

## Links

Render: [https://blaxberry-dashboard-spa.onrender.com](https://blaxberry-dashboard-spa.onrender.com)

## Tech Stacks

- [Vite]() v5
- [TypeScript]() v5
- [React]() v18

## Project Structure

```txt
/
├── public
│   ├── favicon.svg
│   └── ...
├── src
│   ├── __tests__
│   │   ├── jest
│   │   └── vitest
│   ├── apps
│   │   ├── [app]
│   │   │   ├── apis
│   │   │   ├── components
│   │   │   ├── contexts
│   │   │   ├── fixtures
│   │   │   ├── types
│   │   │   └── ...
│   │   └── ...
│   ├── assets
│   ├── components
│   │   ├── common
│   │   └── providers
│   ├── layouts
│   ├── libs
│   ├── pages
│   │   ├── [leaf].tsx
│   │   │   └── [leaf].tsx
│   │   └── root.tsx
│   ├── types
│   ├── utils
│   │   ├── constants
│   │   ├── helpers
│   │   ├── hooks
│   │   ├── router
│   │   ├── tools
│   │   ├── validations
│   │   └── ...
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── .env
├── .env.[mode]
├── packages-build-stats.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── jest.config.json
└── ...
```

## Commands

```shell
yarn dev [--force]          # start local dev server
yarn build && yarn preview  # build then preview

yarn check-type             # check TS type
yarn check-prettier         # check Prettier
yarn check-eslint           # check ESLint

yarn format                 # format code by Prettier
yarn test-jest              # test by Jest
yarn test-vitest            # test by Vitest ( recommend ) then open UI page
```

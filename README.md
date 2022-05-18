# LiveKanban

A live kanban to manage projects, built with [tinyhttp](https://github.com/tinyhttp/tinyhttp), [Prisma](https://www.prisma.io/), [Liveblocks](https://liveblocks.io/) and [Nuxt3](https://v3.nuxtjs.org/).

## What's inside?

This repository is a monorepo powered by [Turborepo](https://turborepo.org/). It includes the following packages/apps:

### Applications

- `web`: a [Nuxt3](https://v3.nuxtjs.org/) application
- `api`: a [tinyhttp](https://github.com/tinyhttp/tinyhttp) API application

### Packages

- `eslint-config-custom`: `eslint` configurations
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Utilities

- [Tailwind](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) for CSS styles and UI components
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Jest](https://jestjs.io/) for tests
- [ESLint](https://eslint.org/) for code linting
- [Commitizen](https://github.com/commitizen/cz-cli) for conventional commit enforcement

## Getting started

### Requirements
| Name                                          | Version     |
| --------------------------------------------- | ----------- |
| [Node](https://nodejs.org/en/)                | 14.0+       |
| [Docker](https://www.docker.com/get-started/) | 20.10+      |

### Installation
To get the project started, clone this repository:
```sh
# With SSH
git clone git@github.com:IIM-Creative-Technology/NODEJS-SOCKETIO-IIM-DW1-PROPRE.git

# With HTTP
git clone https://github.com/IIM-Creative-Technology/NODEJS-SOCKETIO-IIM-DW1-PROPRE.git
```

Then install packages:
```sh
npm install
```

If you want to use it there is a development database ready with Docker compose:
```sh
docker-compose up -d
```

Then you need to run the prisma `generate` command:
```sh
# Navigate to the api app directory
cd apps/api
npx prisma generate
```

### Development
To run the project for development use:
```sh
npm run dev
```
It will automatically run the Nuxt and Adonis apps on your `localhost`.

### Build
To build the project use:
```sh
npm run build
```

## Linting
All apps in the repository can be linted with:
```
npm run lint
```

## Tests
Don't forget to test your code before sending a PR.

To run tests you can run:
```sh
npm run test
```

## Contributing
Any help and contribution is welcome, feel free to submit issues and/or contribute to the project.

**Please read through the [contributing guidelines](./.github/CONTRIBUTING.md) for more details.**

## License
Copyright (c) 2022 Antoine Puech, Florent Vigot, Samir Chalal, Colin Espinas.

**Live Kanban is distributed under the MIT License. [See the license for more details](./LICENSE).**
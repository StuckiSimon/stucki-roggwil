# Stucki Roggwil Worker

## Setup

1. Setup local db by running `npx wrangler d1 migrations apply db-stucki-roggwil` (local db is stored in `.wrangler/state/`)
2. Create a `.env` file with the following variables:

```
ADMIN_KEY=your_admin_key
```


## Development

1. Run `wrangler dev` to start a local instance of the API.
2. Server runs on `http://localhost:8787/`.

## Database

Migrations are stored in the `migrations` folder.

Migrations must be executed manually using the command:

```sh
npx wrangler d1 migrations apply db-stucki-roggwil --remote
```

> [!NOTE]
> `down.sql` contains the commands to reset the database to an empty state.

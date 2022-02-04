# ⚡Supachat

A real-time chat app using **[Svelte](https://svelte.dev/)** and **[Supabase](https://supabase.com/)**

## Installation

`npm install` to initialize all dependencies

## Supabase setup

Create a `.env` file with variables `VITE_PUBLIC_SUPABASE_URL` and `VITE_PUBLIC_SUPABASE_ANON_KEY` (These can be located in your Supabase project under **Settings** > **API**)

## Supabase project

Tables are pretty much simple and direct to the point (just to avoid using inner joins and all)

**For the Global chat table**
| Field | Type |
| -- | -- |
| id (primary) | int8 |
| username | varchar |
|created_at|timestampz (default value is: **now()**|
|message|text|
|replied_to_id|int2|
|replied_to_user|varchar|
|replied_to_message|text|

**For the users table**
| Field | Type |
| -- | -- |
| id (primary) | int8 |
|created_at|timestampz (default value is: **now()**|
|username|varchar|

## Developing and building

Start development server `npm run dev` and `npm run build`

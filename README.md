# MASS-73 (name under deliberation)

**Your app for practicing and tracking your progress with a metronome.**

---

**M**`etronome` **A**`s` **A S**`ervice`**-73** is an app that helps musicians track their progress when using a metronome. Practicing technique can be enough of a challenge to *also* have to be worried about your progress, goals, the exercises you were supposed to be playing...
That is why MASS-73 exists: it lets you use a simple metronome while tracking your progress and providing a way of setting your goals for every practice session.
## Main technologies used

- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io) (using @next version? [see v10 docs here](https://alpha.trpc.io))

## How to run the app locally

To install all the dependencies and packages run:

### yarn 

```bash
yarn 
```

### npm 

```bash
npm install 
```

To create a local SQLite database change the `'provider'` in the *schema.prisma* to sqlite and add a 
`DATABASE_URL=file:./db.sqlite` into the *.env* file (it is already detailed in the *.env.example*) and run:

```bash
yarn prisma db push
// or
npx prisma db push
```
to create the database from the latest migration.

Now the only thing left is to add the *.env* files for the auth0 integration and generate a safe key for the `NEXTAUTH_SECRET`

To start the development server run: 

```bash
yarn dev
// or
npm run dev
```

---
*This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack. More information on the stack and `create-t3-app` can be found on the <a href="https://github.com/t3-oss/create-t3-app/tree/next#what-is-the-t3-stack" target="_blank" rel="noopener noreferrer">repo</a>.*

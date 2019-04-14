# SimplAuto Backend

---

# Scripts

- npm run dev (Start in development)
- npm run deploy (Deploy the datamodel to the hosted prisma + generate the prisma-typescript client)
- npm run seeds (Seed the database)
- npm run generate (Generates the type definitions for the Yoga schema)
- prisma reset (Empty the database)

# How the backend works

- schema.graphql: describes every query and mutations and the available schema between frontend and backend
- datamodel.prisma: describes the database schema
- generated/: generated files from the command 'npm run generate' will describe the Typescript schemas
- Mutations/: describe how to resolve the mutaions
- Queries/: describe how to resolve the queries
- Node/: describe how to resolve each element in an entity
- Seeds/: Code run only when executing 'npm run seeds', will create basic data in your database

# Heroku

- Create a new Heroku account
- Wait for the tranfer of the ownership of the apps, you may need to enter your credit card to keep our apps plugins
- We have 3 heroku apps: frontend, backend and our Database (randomly generated name)
- We use TravisCI to deploy each app
- Install the heroku CLI

# TravisCI

- Create a new account
- Link travisCI to your github repositories ( you might need to wait for the transfer of the repos)
- Install TravisCI CLI
- run "heroku auth:token" in a bash terminal, keep the token
- run "travis encrypt [insert heroku token here]" and replace the api_key.secure value in the .travis.yml for backend AND frontend
- remove Slack notifications

# API (Market Check)

- Create a new account
- Go to my account -> My API Key
- Paste this key into the .env file (for developpement)
- Paste this key into heroku-backend -> setting - config vars (for production)

# Sendgrid

- We use SendGrid to send emails
  user: Simplauto
  pw: Simplauto123!

-you can create new email template and use them

# Cloudinary

- We use Cloudinary to save our images
- It returns an URL we can use, the URLS are saved in the DB and are sent to the frontend when needed

https://res.cloudinary.com/simplauto/image/upload/
email: alexandre.clark@polymtl.ca
pw: aigledefeu

you can create a new account if you want, just make sure the frontend call use the right URL afterwards

# Prisma.IO

- Prisma.io allows use to visualize the content of the database and manage it
- Create a new account and link to the heroku app
  OR
  use this and have access to our developpement databases plus the production database
  Infos pour prisma.io
  user : alexandre.clark@polymtl.ca
  pw: aigledefeu

# Stripe

email: alexandre.clark@polymtl.ca
pw: aigledefeu

- you can create a new account, but you'll need to update the keys and the redo the products

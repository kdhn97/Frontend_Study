npm install --save-dev prisma
npm install @prisma/client
npx prisma init

prisma/schema.prisma : add schema model member {...}
.env DATABASE_URL="postgresql://postgres:1234@localhost:5432/demo"

npx prisma migrate dev --name init

npx prisma generate
build: "prisma generate && next build"

npm install --save-dev ts-node

  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },

create seed.ts file
npx prisma db seed

create prisma.ts file
edit page.tsx


npm install pg
npm install --save-dev @types/pg


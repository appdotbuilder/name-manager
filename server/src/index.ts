import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import { 
  createNameInputSchema, 
  updateNameInputSchema, 
  deleteNameInputSchema 
} from './schema';

// Import handlers
import { createName } from './handlers/create_name';
import { getNames } from './handlers/get_names';
import { updateName } from './handlers/update_name';
import { deleteName } from './handlers/delete_name';
import { getNamesList } from './handlers/get_names_list';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Create a new name
  createName: publicProcedure
    .input(createNameInputSchema)
    .mutation(({ input }) => createName(input)),
  
  // Get all names with full details
  getNames: publicProcedure
    .query(() => getNames()),
  
  // Update an existing name
  updateName: publicProcedure
    .input(updateNameInputSchema)
    .mutation(({ input }) => updateName(input)),
  
  // Delete a name by ID
  deleteName: publicProcedure
    .input(deleteNameInputSchema)
    .mutation(({ input }) => deleteName(input)),
  
  // Get names as a simple string array for clipboard functionality
  getNamesList: publicProcedure
    .query(() => getNamesList()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
import { Hono } from 'hono';
import slotsList from './endpoints/slotsList';

const app = new Hono<{ Bindings: Env }>();

slotsList(app);

export default app;

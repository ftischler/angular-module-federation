import express from 'express';
import { join } from 'path';

/**
 * Use this script by calling `nx run ag-portal:prod-proxy`
 */

const app = express();

app.use('/remotes/app1', express.static(join(process.cwd(), 'dist', 'apps', 'app1')));
app.use('/', express.static(join(process.cwd(), 'dist', 'apps', 'shell')));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on http://localhost:${port}`));

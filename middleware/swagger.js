import path from "path"
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiDocsRoute = "/api-docs";
export const options = {
    info: {
        version: "1.0.0",
        title: "Entoothiast",
    },
    baseDir: __dirname,
    filesPattern: "../**/*.js",
    // URL where SwaggerUI will be rendered. Default. /api-docs
    swaggerUIPath: apiDocsRoute,
    exposeSwaggerUI: true,

    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: "/api-docs",
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
    multiple: true,
};
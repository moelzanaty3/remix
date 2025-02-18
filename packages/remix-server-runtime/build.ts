import type { ActionFunctionArgs, LoaderFunctionArgs } from "./routeModules";
import type { AssetsManifest, EntryContext, FutureConfig } from "./entry";
import type { ServerRouteManifest } from "./routes";
import type { AppLoadContext } from "./data";

/**
 * The output of the compiler for the server build.
 */
export interface ServerBuild {
  mode: string;
  entry: {
    module: ServerEntryModule;
  };
  routes: ServerRouteManifest;
  assets: AssetsManifest;
  publicPath: string;
  assetsBuildDirectory: string;
  future: FutureConfig;
}

export interface HandleDocumentRequestFunction {
  (
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    context: EntryContext,
    loadContext: AppLoadContext
  ): Promise<Response> | Response;
}

export interface HandleDataRequestFunction {
  (response: Response, args: LoaderFunctionArgs | ActionFunctionArgs):
    | Promise<Response>
    | Response;
}

export interface HandleErrorFunction {
  (error: unknown, args: LoaderFunctionArgs | ActionFunctionArgs): void;
}

/**
 * A module that serves as the entry point for a Remix app during server
 * rendering.
 */
export interface ServerEntryModule {
  default: HandleDocumentRequestFunction;
  handleDataRequest?: HandleDataRequestFunction;
  handleError?: HandleErrorFunction;
}

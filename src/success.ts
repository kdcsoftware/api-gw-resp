import STATUS from './constants/status';
import { OpsInput, OpsRedirectInput, BuildOutput } from './interfaces';
import buildResponse from './build';

/** Successful operation */
export const OK = (opts: OpsInput): BuildOutput =>
  buildResponse({ statusCode: STATUS.OK, ...opts });
export const CREATED = (opts: OpsInput): BuildOutput =>
  buildResponse({ statusCode: STATUS.CREATED, ...opts });
export const NO_CONTENT = (opts?: OpsInput): BuildOutput =>
  buildResponse({ statusCode: STATUS.NO_CONTENT, ...opts, body: null });
export const REDIRECT = ({ permanent, ...opts }: OpsRedirectInput) =>
  buildResponse({
    statusCode: permanent ? STATUS.REDIRECT_PERM : STATUS.REDIRECT_TEMP,
    ...opts,
    body: null,
  });

/** SUccessful response via method */
export const GET = (opts: OpsInput) => OK(opts);
export const POST = (opts: OpsInput) => CREATED(opts);
export const PUT = (opts: OpsInput) => NO_CONTENT(opts);
export const DELETE = (opts: OpsInput) => NO_CONTENT(opts);
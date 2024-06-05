// anders: hooks.js runs during pre-rendering, which happens at
// build time, and at the PUBLIC_API_ROOT is not available at buildtime,
// so this doesn't make sense to have here.
//
// import { env } from "$env/dynamic/public";
// 
// if (typeof env.PUBLIC_API_ROOT === "undefined") {
//     console.error("WARNING: Environment variable PUBLIC_API_ROOT not set, all calls to API will result in errors!");
// } else {
//     console.log(`Backend located at ${env.PUBLIC_API_ROOT}`);
// }

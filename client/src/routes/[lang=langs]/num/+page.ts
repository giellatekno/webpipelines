import { tools_for } from "$lib/langs";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
    if (!tools_for[params.lang].includes("num")) {
        error(404, "Not Found");
    }
    // Fetch your data

    return {
        // prop: 'value'
    };
};

<script lang="ts">
    import {
        ChevronDown,
        ChevronUp,
        CircleQuestionMarkIcon,
    } from "@lucide/svelte";
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";
    let { tool } = $props();
</script>

<Accordion collapsible>
    <Accordion.Item value="1">
        <h3>
            <Accordion.ItemTrigger
                class="flex flex-row items-center justify-between"
            >
                <span class="flex flex-row gap-2">
                    <CircleQuestionMarkIcon />
                    {$t("instruction.title")}
                </span>
                <Accordion.ItemIndicator class="group">
                    <ChevronUp
                        class="hidden size-4 group-data-[state=open]:block"
                    />
                    <ChevronDown
                        class="block size-4 group-data-[state=open]:hidden"
                    />
                </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
                {$t(tool + ".instruction")}
            </Accordion.ItemContent>
        </h3>
    </Accordion.Item>
</Accordion>

<script lang="ts">
    import { locale, locales_in_locale } from "$lib/locales";
    import { Popover, Portal } from "@skeletonlabs/skeleton-svelte";
    import { LanguagesIcon } from "@lucide/svelte";
    import { t } from "svelte-intl-precompile";
</script>

<Popover>
    <Popover.Trigger class="btn preset-filled-primary-500">
        <LanguagesIcon />
        {$t("interfacelanguage")}
    </Popover.Trigger>
    <Portal>
        <Popover.Positioner>
            <Popover.Content
                class="card preset-filled-surface-100-900 border-surface-200-800 w-fit border p-4 shadow-xl"
            >
                <Popover.Description>
                    <ul class="w-full">
                        {#each Object.entries(locales_in_locale) as [iso, name]}
                            <li>
                                <button
                                    class="btn hover:preset-tonal w-full justify-start"
                                    onclick={() => ($locale = iso)}
                                >
                                    {name}
                                </button>
                            </li>
                        {/each}
                    </ul>
                </Popover.Description>
            </Popover.Content>
        </Popover.Positioner>
    </Portal>
</Popover>

<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { Dot, GlobeIcon, InfoIcon, MenuIcon, XIcon } from "@lucide/svelte";
    import { Dialog, Navigation, Portal } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";
    import SelectLocale from "./SelectLocale.svelte";
    import { tools_for } from "$lib/langs";

    let lang = $derived(page.params.lang);
    let on_lang_page = $derived(lang && page.url.pathname.includes("/" + lang));

    const constant_links = [
        { label: $t("languages"), href: resolve("/"), icon: GlobeIcon },
        { label: $t("about"), href: resolve("/about"), icon: InfoIcon },
    ];

    const animBackdrop =
        "transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100";
    const animModal =
        "transition transition-discrete opacity-0 -translate-x-full starting:data-[state=open]:opacity-0 starting:data-[state=open]:-translate-x-full data-[state=open]:opacity-100 data-[state=open]:translate-x-0";
</script>

<Dialog>
    <Dialog.Trigger class="btn-icon preset-tonal">
        <MenuIcon class="size-5" />
    </Dialog.Trigger>
    <Portal>
        <Dialog.Backdrop
            class="bg-surface-50-950/50 fixed inset-0 z-50 transition transition-discrete {animBackdrop}"
        />
        <Dialog.Positioner class="fixed inset-0 z-50 flex justify-start">
            <Dialog.Content
                class="card bg-surface-100-900 h-dvh w-fit space-y-4 p-4 shadow-xl {animModal}"
            >
                <Navigation
                    layout="sidebar"
                    class="grid grid-rows-[auto_auto_1fr_auto] gap-4"
                >
                    <Navigation.Header
                        class="flex items-center justify-between"
                    >
                        <Dialog.Title class="text-2xl font-bold">
                            Webpipeline
                        </Dialog.Title>
                        <Dialog.CloseTrigger class="btn-icon preset-tonal">
                            <XIcon />
                        </Dialog.CloseTrigger>
                    </Navigation.Header>
                    <hr class="hr" />
                    <Navigation.Content>
                        <Navigation.Group>
                            {#each constant_links as link (link)}
                                {@const Icon = link.icon}
                                <Dialog.Trigger>
                                    <a
                                        href={link.href}
                                        title={link.label}
                                        class="btn hover:preset-tonal w-full justify-start px-2"
                                    >
                                        <Icon class="size-5" />
                                        <span>{link.label}</span>
                                    </a>
                                </Dialog.Trigger>
                            {/each}
                        </Navigation.Group>
                        {#if lang && on_lang_page}
                            <Navigation.Group>
                                <Navigation.Label class="pl-2">
                                    {$t(`toolsfor.${lang}`)}
                                </Navigation.Label>
                                {#each tools_for[lang] as tool}
                                    <Dialog.Trigger>
                                        <a
                                            href={resolve(`/${lang}/${tool}`)}
                                            title={tool}
                                            class="btn hover:preset-tonal w-full justify-start px-2 text-sm"
                                        >
                                            <Dot class="" />
                                            <span>{$t(tool)}</span>
                                        </a>
                                    </Dialog.Trigger>
                                {/each}
                            </Navigation.Group>
                        {/if}
                    </Navigation.Content>
                    <Navigation.Footer>
                        <SelectLocale />
                    </Navigation.Footer>
                </Navigation>
            </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog>

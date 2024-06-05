<script>
    import { afterNavigate } from "$app/navigation";
    import { base } from "$app/paths";
    let route = "";
    afterNavigate(navigation => {
        route = navigation.to.route.id;
    });
</script>

<div style="display: grid; place-items: center;">
    <div style="display: flex; flex-direction: column;">
        <div style="font-size: 1.65rem; font-weight: bold;">
            <span>Program:</span>
            <a class:current={route == "/"} href="{base}/">Frekvensorterte ukjente</a>
            <a class:current={route == "/lemmalist"} href="{base}/lemmalist">Lemmaliste</a>
        </div>

        <slot />
    </div>
</div>

<style>
    a.current {
        color: black;
        text-decoration: none;
    }
</style>

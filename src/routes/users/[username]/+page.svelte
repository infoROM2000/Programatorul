<script lang="ts">
    import { page } from "$app/state";
    import { PlayerStore, Player } from "$lib/stores/Player";
    let u = page.params.username;
    let player = PlayerStore.getPlayers().find((e) => {
        return e.name == u;
    }) as Player;
</script>

<main>
    <p>ID:{player.id}</p>
    <p>Nume: {player.name}</p>
    <p>Elo: {player.elo}</p>
    <p>Victorii: {player.wins}</p>
    <p>Egal: {player.draws}</p>
    <p>Infrangeri: {player.lost}</p>
</main>

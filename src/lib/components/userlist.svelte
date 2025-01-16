<script lang="ts">
    import { PlayerStore, Player } from "$lib/stores/Player";
    import * as symbols from "$lib/symbols";
    let editPlayers: boolean = false;
    let newPlayer: string = "";
    function addPlayer() {
        if (newPlayer == "") return;
        else {
            let user = new Player(newPlayer);
            PlayerStore.push(user);
            newPlayer = "";
        }
        console.log(PlayerStore.getPlayers());
    }
</script>

<details>
    <summary>Lista utilizatori</summary>
    <table id="Users">
        <thead>
            <tr>
                <td
                    ><button onclick={() => PlayerStore.sort("name")}
                        >Nume</button
                    ></td
                >
                <td
                    ><button onclick={() => PlayerStore.sort("elo")}>Elo</button
                    ></td
                >
                <td
                    ><button
                        onclick={() => {
                            editPlayers = editPlayers ? false : true;
                        }}
                    >
                        {#if editPlayers}{symbols.openLock}
                        {:else}
                            {symbols.closedLock}
                        {/if}</button
                    ></td
                >
            </tr>
        </thead>
        <tbody>
            {#each $PlayerStore as player}
                <tr>
                    <td><a href="users/{player.name}">{player.name}</a></td>
                    <td>{player.elo}</td>
                    <td hidden={!editPlayers}
                        ><button onclick={() => PlayerStore.remove(player)}
                            >{symbols.trash}</button
                        ></td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
    <div hidden={!editPlayers}>
        <label for="addUser">Adauga: </label>
        <input type="text" bind:value={newPlayer} />
        <button onclick={() => addPlayer()}>{symbols.plus}</button>
    </div>
</details>

<style>
    table {
        border: 5px black;
        text-align: center;
    }
    td {
        border: 2px black dotted;
        height: 30px;
    }
</style>

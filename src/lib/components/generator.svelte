<script lang="ts">
    import type { PlayerStore } from "$lib/stores/Player";
    import {
        tournamentType,
        matchingAlgorithm,
        SessionStore,
        Session,
    } from "$lib/stores/Session";
    import * as symbols from "$lib/symbols";
    let selectedTournamentType: string;
    let selectedMatchingAlgorithm: string;
    let selectedPlayers: PlayerStore[] = [];
</script>

<details>
    <summary>Generatorul</summary>
    <p>
        Selectati participantii la actuala sesiune {symbols.plus}
    </p>
    <label for="format">Format:</label>
    <select bind:value={selectedTournamentType}>
        {#each tournamentType as type}
            <option value={type.value}>{type.description}</option>
        {/each}
    </select>
    <label for="algoritm">Algoritm:</label>
    <select bind:value={selectedMatchingAlgorithm}>
        {#each matchingAlgorithm as type}
            <option value={type.value}>{type.description}</option>
        {/each}
    </select>
    <input type="checkbox" value="WeakWhite" />
    <label for="WeakWhite">Jucatorul mai slab primeste mereu albele</label>
    <div hidden={selectedTournamentType != "swiss"}>
        <label for="runde">Nr. runde</label>
        <input type="number" min="1" />
    </div>
    <button
        onclick={() =>
            SessionStore.push(
                new Session(selectedTournamentType, selectedPlayers),
            )}>Genereaza</button
    >
</details>

<script lang="ts">
  import { User, users } from "$lib/User";
  import { writable } from "svelte/store";
  const K = 20;
  const closedLock = "\u{1F512}";
  const openLock = "\u{1F513}";
  const plus = "\u{2795}";
  const minus = "\u{2796}";
  const trash = "\u{1F5D1}";
  let locked = true;
  interface Option {
    value: string;
    description: string;
  }
  const tournamentType: Option[] = [
    { value: "cup", description: "Cupa" },
    { value: "swiss", description: "Swiss" },
    { value: "roundrobin", description: "Campionat" },
  ];
  const matchingAlgorithm: Option[] = [
    { value: "random", description: "Aleator" },
    { value: "sameElo", description: "Valori apropiate" },
    { value: "differentElo", description: "Dezechilibrat" },
  ];
  let selectedTournamentType: string;
  let selectedMatchingAlgorithm: string;
  let sessionPlayers = writable<User[]>([]);
  let newUser: string = "";
  let start = false;
  function addUser() {
    if (newUser == "") return;
    else {
      let user = new User(newUser);
      users.push(user);
      newUser = "";
    }
  }
  function sessionToggle(user: User) {
    sessionPlayers.update((players) => {
      if (players.find((e) => e.id === user.id)) {
        //if player is in session
        return players.filter((e) => e.id !== user.id); // remove it
      } else {
        return [...players, user]; //else add it
      }
    });
  }
  function generate() {
    if (selectedTournamentType == "cup") {
      if (powerof2($sessionPlayers.length)) {
        console.log("OK");
        sessionPlayers.update((sessionPlayers) => {
          return initialRound(sessionPlayers);
        });
        start = true;
      }
    }
  }
  function initialRound(sessionPlayers: User[]) {
    let result: User[] = [];
    let index = 0;
    while (sessionPlayers.length > 0) {
      index = Math.floor(Math.random() * sessionPlayers.length);
      result.push(sessionPlayers[index]);
      sessionPlayers=sessionPlayers.filter((e) => e.id !== sessionPlayers[index].id);
    }
    return result;
  }
  function powerof2(n: number) {
    return n > 1 && (n & (n - 1)) === 0;
  }
</script>

<main>
  <div>
    <details>
      <summary>Participanti</summary>
      <table id="Users">
        <thead>
          <tr>
            <td><button onclick={() => users.sort("name")}>Nume</button></td>
            <td><button onclick={() => users.sort("elo")}>Elo</button></td>
            <td
              ><button
                onclick={() => {
                  locked = locked ? false : true;
                }}
              >
                {#if locked}{closedLock}
                {:else}
                  {openLock}
                {/if}</button
              ></td
            >
          </tr>
        </thead>
        <tbody>
          {#each $users as user}
            <tr
              class:green={$sessionPlayers.some(
                (player) => player.id === user.id,
              )}
              class:red={!$sessionPlayers.some(
                (player) => player.id === user.id,
              )}
            >
              <td><a href="users/{user.name}">{user.name}</a></td>
              <td>{user.elo}</td>
              <td
                ><button onclick={() => sessionToggle(user)}>
                  {#if $sessionPlayers.some((player) => player.id === user.id)}
                    {minus}
                  {:else}
                    {plus}
                  {/if}</button
                ></td
              >
              <td
                ><button onclick={() => users.remove(user)} hidden={locked}
                  >{trash}</button
                ></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </details>
    <div hidden={locked}>
      <label for="addUser">Adauga: </label>
      <input type="text" bind:value={newUser} />
      <button onclick={() => addUser()}>+</button>
    </div>
    <details>
      <summary>Istoric</summary>
      <label for="addMatch">Adauga joc amical (in afara turneului):</label>
      <select>
        {#each $users as user}
          <option value={user.id}>{user.name}</option>
        {/each}
      </select>
      <select>
        {#each $users as user}
          <option value={user.id}>{user.name}</option>
        {/each}
      </select>
      <button onclick={() => addUser()}>+</button>
    </details>
    <details>
      <summary>Generatorul</summary>
      <p>
        Selectati participantii la actuala sesiune din meniul participanti
        apasand plus pentru fiecare invitat. Momentat ati selectat {$sessionPlayers.length}
        persoane
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
        <input type="number" min="1" max={$sessionPlayers.length - 2} />
      </div>
      <button onclick={() => generate()}>Genereaza</button>
      {#if start}
        {#each $sessionPlayers as player}
          <p>{player.name}-{player.elo}</p>
        {/each}
      {/if}
    </details>
  </div>
</main>

<style>
  table,
  tr,
  td {
    border: 10px black;
  }
  .red {
    background-color: red;
  }
  .green {
    background-color: green;
  }
</style>

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
  const sessionPlayers = writable<User[]>([]);
  let newUser: string = "";
  function addUser() {
    let name: string = newUser ?? "";
    if (name == "") return;
    else {
      let user = new User(name);
      users.push(user);
      newUser = "";
    }
  }
  function editUsers() {
    locked = locked ? false : true;
  }
  function sessionToggle(user: User) {
    sessionPlayers.update((players) => {
      if (players.find((e) => e.id === user.id)) {
        return players.filter((e) => e.id !== user.id);
      } else {
        return [...players, user];
      }
    });
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
              ><button onclick={() => editUsers()}>
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
      <button onclick={()=>addUser()}>+</button>
    </details>
    <details>
      <summary>Generatorul</summary>
      <p>
        Selectati participantii la actuala sesiune din meniul participanti
        apasand plus pentru fiecare invitat. Momentat ati selectat {$sessionPlayers.length}
        persoane
      </p>
      <label for="format">Format:</label>
      <select>
        {#each tournamentType as type}
          <option value={type.value}>{type.description}</option>
        {/each}
      </select>
      <label for="algoritm">Algoritm:</label>
      <select>
        {#each matchingAlgorithm as type}
          <option value={type.value}>{type.description}</option>
        {/each}
      </select>
      <label for="runde">Nr. runde (doar pentru Swiss)</label>
      <input type="number" min=0 max={$sessionPlayers.length - 2} />
      <input type="checkbox" value="WeakWhite" />
      <label for="WeakWhite">Jucatorul mai slab primeste mereu albele</label>
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

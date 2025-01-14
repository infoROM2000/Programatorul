<script lang="ts">
  import { User, users } from "$lib/User";
  import { writable } from "svelte/store";
  const K = 20;
  let locked = true;
  const sessionPlayers = writable<User[]>([]);
  function addUser() {
    let newUser = document.getElementById("newUser") as HTMLInputElement;
    let name: string = newUser?.value ?? "";
    if (name == "") return;
    else {
      let user = new User(name);
      users.push(user);
      newUser.value = "";
    }
  }
  const closedLock = "\u{1F512}";
  const openLock = "\u{1F513}";
  const plus = "\u{2795}";
  const minus = "\u{2796}";
  const trash = "\u{1F5D1}"
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
            <tr class:green={$sessionPlayers.some((player) => player.id === user.id)} class:red={!$sessionPlayers.some((player) => player.id === user.id)}>
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
      <label>Adauga: </label>
      <input id="newUser" type="text" />
      <button onclick={() => addUser()}>+</button>
    </div>
    <details>
      <summary>Istoric</summary>
    </details>
    <details>
      <summary>Generatorul</summary>
      <p>
        Selectati participantii la actuala sesiune din meniul participanti apasand plus pentru
        fiecare invitat
      </p>
      <label for="format">Format:</label>
      <select>
        <option value="cup">Cupa (necesita nr de participanti putere a lui 2)</option>
        <option value="swiss">Swiss (recomandat pentru mai mult de 6 participanti)</option>
        <option value="championship">Campionat (recomandat pentru mai putin de 6 participanti)</option>
      </select>
      <label for="algoritm">Algoritm:</label>
      <select>
        <option value="random">Aleator</option>
        <option value="same">Valori apropiate</option>
        <option value="different">Valori opuse</option>
      </select>
      <label for="runde">Nr. runde (doar pentru Swiss)</label>
    </details>
  </div>
</main>

<style>
  table,
  tr,
  td {
    border: 10px black;
  }
  .red{
    background-color: red;
  }
  .green{
    background-color: green;
  }
</style>

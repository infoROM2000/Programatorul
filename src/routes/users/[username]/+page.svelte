
<script lang="ts">
    import {page} from '$app/state';
    import {User,users} from "$lib/User";
    let u=page.params.username;
    let user=$users.find(e=>{return e.name==u}) as User
</script>
<main>
<p>ID:{user.id}</p>
<p>Nume: {user.name}</p>
<p>Elo: {user.elo}</p>
<p>Victorii: {user.wins}</p>
<p>Egal: {user.draws}</p>
<p>Infrangeri: {user.lost}</p>
</main>
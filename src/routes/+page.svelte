<script lang="ts">
  import Generator from "$lib/components/generator.svelte";
  import History from "$lib/components/history.svelte";
  import Userlist from "$lib/components/userlist.svelte";
</script>

<main>
  <div>
    <Userlist></Userlist>
    <History></History>
    <Generator></Generator>
  </div>
</main>

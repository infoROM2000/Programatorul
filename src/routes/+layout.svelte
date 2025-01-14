<script lang="ts">
    import Navbar from "$lib/navbar.svelte";

    let { children } = $props();
</script>
<Navbar></Navbar>
<div id="letter">
{@render children()}
</div>
<style>
    :global(body) {
		margin-left: 20%;
		margin-right: 20%;
		margin-top: 5%;
		margin-bottom: 5%;
		text-align: justify;
		text-justify: inter-word;
        background-image: url("chess.jpg");
	}
    #letter{
        background-color: grey;
    }
    :global(a, button) {
        color: black;
        text-decoration: none;
        font-size:20px;
    }
    :global(table,td){
        border:10px solid black;
    }
</style>

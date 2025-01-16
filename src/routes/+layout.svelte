<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Navbar from "$lib/components/navbar.svelte";

    let { children } = $props();
</script>

<head>
    <title> PJS </title>
</head>
<Header></Header>
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
        background-image: url("./chess.jpg");
    }
    #letter {
        background-color: grey;
    }
    :global(a, button) {
        color: black;
        text-decoration: none;
        font-size: 15px;
    }
</style>

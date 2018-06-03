<template>
    <main class="tickets-layout">
        <h1>Your Support tickets</h1>
        <Tickets/>
    </main>
</template>

<script>
    import Tickets from './Tickets.vue'
    export default {
        components: {
            Tickets,
        },
    }
</script>

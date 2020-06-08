<template>
    <div
        :id="id"
        class="card"
        :draggable="draggable"
        @dragenter.stop
        @dragleave.stop
        @drop.stop
    >
        <slot />
    </div>
</template>

<script>
export default {
    props: ['id', 'draggable'],
    methods: {

    }
}
</script>
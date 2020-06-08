<template v-slot:activator="{ on }">
    <Workspace category="0x01" />
</template>

<script>
import Workspace from "@/components/Workspace";

export default {
    name: "If",
    components: {Workspace}
};
</script>

<style scoped>

</style>
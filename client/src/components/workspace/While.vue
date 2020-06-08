<template v-slot:activator="{ on }">
    <Workspace category="0x02" />
</template>

<script>
import Workspace from "@/components/Workspace";

export default {
    name: "While",
    components: {Workspace}
};
</script>

<style scoped>

</style>
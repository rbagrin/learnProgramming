<template>
    <div
        :id="id"
        class="board"
        @dragover.prevent
        @drop.prevent="drop"
        @dragenter.prevent="dragEnter"
        @dragleave.prevent="dragLeave"
        @dragstart="dragStart"
        @dragend="dragEnd"
        style="height: 200px"
    >
        <slot />
    </div>
</template>

<script>
export default {
    props: ['id'],
    methods: {
        drop(e) {

            const card_id = e.dataTransfer.getData('card_id');
            const card = document.getElementById(card_id);

            card.style.display = "block";

            // Daca casuta e deja ocupata nu mai adauga alt element
            if (e.target.childElementCount === 0) {
                e.target.appendChild(card);
            }

            document.getElementById(e.target.id).className = 'board';
        },
        dragEnter: (e) => {
            document.getElementById(e.target.id).className = 'board hovered';
        },
        dragLeave: (e) => {
            document.getElementById(e.target.id).className = 'board';
        },
        dragStart: (e) => {


            const target = e.target;
            e.dataTransfer.setData('card_id', target.id);
            setTimeout(() => {
                target.style.display = "none";
            }, 0);
        },
        dragEnd: (e) => {
            e.target.style.display = "block";
        }
    }
}
</script>
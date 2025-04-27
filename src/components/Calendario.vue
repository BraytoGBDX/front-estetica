<template>
    <div class="calendario-container">
        <VueCal style="height: 300px; max-width: 900px; margin: 0 auto;" :events="eventosCalendario" hide-view-selector
            default-view="month" time="false" />

    </div>
</template>

<script setup>
import { computed } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const props = defineProps({
    citas: {
        type: Array,
        required: true
    }
});

const eventosCalendario = computed(() =>
    props.citas.map(cita => ({
        start: cita.fecha + 'T' + cita.horario,
        end: cita.fecha + 'T' + cita.horario,
        title: `Cita con ${cita.nombreUsuario}`
    }))
);
</script>

<style scoped>
.calendario-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.vuecal {
  font-size: 12px;
}

</style>
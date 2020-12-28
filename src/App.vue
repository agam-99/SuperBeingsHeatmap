<template>
  <div id="app">
      <heat-map></heat-map>
  </div>
</template>

<script>
import HeatMap from './components/HeatMap.vue'

export default {
    name: 'app',
    components: {
        'heat-map': HeatMap
    }
}
</script>

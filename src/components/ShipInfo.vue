
<template>
  <div class="ship-info">
    <p>Name: {{ ship.name }}</p>
    <p>Model: {{ ship.model }}</p>
    <p>Films: {{ ship.films.length }}</p>
    <img class="ship-info__icon" v-show="filmCount === ship.films.length" src="@/assets/stormtrooper_icon.svg">
  </div>
</template>

<script lang="ts">
import { Starship } from '@/models/starships'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class ShipInfo extends Vue {
  @Prop() ship!: Starship
  @Prop() filmCount!: number
}
</script>

<style lang="scss" scoped>
.ship-info {
  border-radius: 5px;
  padding: 10px 15px;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, .3);
  position: relative;

  &__icon {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>

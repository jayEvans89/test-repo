<template>
  <div class="home">
    <button @click="getShips">Get Starships</button>
    <div v-show="gettingData" class="getting-data">
      <p class="getting-data__text">Getting data</p>
      <span class="getting-data__spinner"></span>
    </div>
    <div class="ship-container" v-show="!gettingData">
      <ship-info
        v-for="(ship, index) in sortedShips"
        :key="ship.name + index"
        :ship="ship"
        :film-count="filmCount"
      ></ship-info>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StarshipService from '@/services/starships'
import { Starship } from '@/models/starships'
import ShipInfo from '@/components/ShipInfo.vue'

@Component({
  components: {
    ShipInfo
  }
})
export default class Home extends Vue {
  public sortedShips = [] as Array<Starship>
  public filmCount = 0
  public gettingData = false

  async getShips() {
    this.gettingData = true
    const res = await StarshipService.getAllPages('https://swapi.dev/api/starships/')
    const filtered = res.filter(this.filterShips)
    this.sortedShips = this.sortData(filtered)
    this.mostFilms(this.sortedShips)

    StarshipService.starshipData = []
    this.gettingData = false
  }

  sortData(ships: Array<Starship>) {
    return ships.sort((a, b) => parseInt(a.crew) - parseInt(b.crew))
  }

  filterShips(ship: Starship) {
    return parseInt(ship.crew) < 10
  }

  mostFilms(ships: Array<Starship>) {
    let filmCount = 0
    ships.forEach(ship => {
      if (ship.films.length > filmCount) {
        filmCount = ship.films.length
      }
    })
    this.filmCount = filmCount
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/tools/breakpoint';

.home {
  max-width: 1000px;
  margin: 30px auto;
}

button {
  background: #000;
  color: #fff;
  border-radius: 5px;
  border: 0;
  padding: 10px;
  font-size: 20px;
  display: block;
}

.ship-container {
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr;
  margin-top: 30px;

  @include breakpoint.min(sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include breakpoint.min(md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include breakpoint.min(lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.getting-data {
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  &__text {
    margin-right: 10px;
  }

  &__spinner {
    width: 30px;
    height: 30px;
    border: 4px solid #000;
    border-top: 4px solid transparent;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
    animation: spin 2s linear infinite;
    display: inline-block;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

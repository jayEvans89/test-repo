import { Starship, StarshipsResponse } from '@/models/starships'
import axios from 'axios'

class StarshipsService {
  public starshipData = [] as Array<Starship>

  async get(): Promise<StarshipsResponse> {
    const res = await axios.get('https://swapi.dev/api/starships/')
    return res.data
  }

  async getPage(url: string) {
    const res = await axios.get(url)
    return res.data
  }

  async getAllPages(url: string): Promise<Array<Starship>> {
    const res = await this.getPage(url)
    this.starshipData = [...this.starshipData, ...res.results]
    if (res.next !== null) {
      return this.getAllPages(res.next)
    } else {
      return this.starshipData
    }
  }
}

export default new StarshipsService()

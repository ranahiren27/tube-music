<template>
  <div class="app">
    <div class="searchBox">
      <md-field>
        <label>Search your favorite song from youtube</label>
        <md-input
          v-model="query"
          v-on:keyup="onQueryChange"
          id="query"
        ></md-input>
        <md-icon>search</md-icon>
      </md-field>
    </div>
    <SongContainer v-bind:songs="songs" v-bind:load="loadMore" />
  </div>
</template>

<script>
import { getSongs } from '../service'
import SongContainer from './SongContainer'

export default {
  name: 'Search',
  components: {
    SongContainer,
  },
  data: () => {
    return {
      query: '',
      nextPageToken: '',
      songs: [],
    }
  },
  methods: {
    onQueryChange: async function (event) {
      if (event.key === 'Enter') {
        const response = await getSongs(this.query)
        this.nextPageToken = response.data.nextPageToken || ''
        this.previousePageToken = response.data.previousePageToken || ''
        this.songs = response.data.items
        this.nextPageToken = ''
      }
    },
    loadMore: async function () {
      const response = await getSongs(this.query, this.nextPageToken)
      this.nextPageToken = response.data.nextPageToken || ''
      this.previousePageToken = response.data.previousePageToken || ''
      this.songs = this.songs.concat(response.data.items)
    },
  },
}
</script>

<style scoped>
.md-field:last-child {
  margin-bottom: 40px;
}
.searchBox {
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  background: white;
  position: fixed !important;
  z-index: 10000;
}
.searchBox .md-icon {
  padding-right: 60px;
}
label {
  padding-left: 15px;
}
.app {
  margin: 10px 10px;
}
</style>

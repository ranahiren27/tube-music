<template @>
  <div>
    <h5 v-if="audio !== ''"><a :href="audio">Download current song</a></h5>
    <div
      class="searchResult"
      v-infinite-scroll="load"
      infinite-scroll-distance="10"
    >
      <div v-for="(value, index) in songs" :key="index">
        <md-card v-on:click="play(value.id.videoId)">
          <md-card-media>
            <img
              style="width: 150px; height: 120px;"
              :src="value.snippet.thumbnails.high.url"
              alt="Can't load image Sorry!!"
            />
          </md-card-media>
          <md-card-header>
            <div class="md-title">{{ value.snippet.title }}</div>
          </md-card-header>
        </md-card>
      </div>
    </div>
    <audio id="audioPlayer" controls class="player" :src="audio" autoplay>
      Your browser does not support the audio tag.
    </audio>
  </div>
</template>

<script>
import { getSongUrl } from '../service'
import Player from './Player'

export default {
  name: 'SongContainer',
  components: [Player],
  props: ['songs', 'load'],
  data: () => {
    return {
      audio: '',
      download: '',
    }
  },
  methods: {
    play: async function (id) {
      const url = await getSongUrl(id)
      this.audio = url
    },
    downloadSong: async function (id) {
      const url = await getSongUrl(id)
      this.download = url
    },
    playAndPause: function () {
      const player = document.getElementById('audioPlayer')
      if (player.paused) player.play()
      else player.pause()
    },
  },
}
</script>

<style scoped>
.player {
  position: fixed;
  margin: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 100000;
}

.md-card {
  width: 150px;
  height: 150px;
  margin: 4px;
}
.md-card-header {
  height: 10px !important;
}
.md-title {
  font-size: 10px !important;
  margin-top: -27px !important;
  margin-left: -10px !important;
  text-overflow: ellipsis;
  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
}
.searchResult {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 200px 200px;
  grid-row-gap: 10px;
  cursor: pointer;
}
</style>

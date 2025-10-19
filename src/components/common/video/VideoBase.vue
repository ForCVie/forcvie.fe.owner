<template>
  <div class="app">
    <Videoplayer
      class="videoplayer"
      :src="videoUrl"
      :muted="false"
      :autoplay="false"
      :controls="true"
      :loop="false"
      :poster="posterUrl"
      :width="width"
      :heigth="heigth"
      @play="onPlayerPlay"
      @pause="onPlayerPause"
      @ended="onPlayerEnded"
      @loadeddata="onPlayerLoadeddata"
      @waiting="onPlayerWaiting"
      @playing="onPlayerPlaying"
      @timeupdate="onPlayerTimeupdate"
      @canplay="onPlayerCanplay"
      @canplaythrough="onPlayerCanplaythrough"
      @statechanged="playerStateChanged"
    >
    </videoplayer>
  </div>
</template>
<script>
import Videoplayer from './videoplayer.vue';

export default {
  components: {
    Videoplayer
  },
  data() {
    return {
      time: 0,
    };
  },
  props: {
    videoUrl: {
        default: "https://down-tx-sg.vod.susercontent.com/api/v4/11110105/mms/vn-11110105-6khwa-m85p9851hgnb5c.16004111755109671.mp4",
        type: String
    }, 
    posterUrl: {
        default: "",
        type: String
    },
    width: { type: [Number, String], required: false, default: '100%' }, 
    height: { type: [Number, String], required: false, default: 'auto' }, 
  },
  methods: {
    onPlayerPlay({ event, player }) {
      console.log(event.type);
      player.setPlaying(true);
    },
    onPlayerPause({ event, player }) {
      console.log(event.type);
      player.setPlaying(false);
    },
    onPlayerEnded({ event, player }) {
      console.log(event.type);
      player.setPlaying(false);
    },
    onPlayerLoadeddata({ event }) {
      console.log(event.type);
    },
    onPlayerWaiting({ event }) {
      console.log(event.type);
    },
    onPlayerPlaying({ event }) {
      console.log(event.type);
    },
    onPlayerTimeupdate({ event }) {
      this.time = event.target.currentTime;
      console.log({ event: event.type, time: event.target.currentTime });
    },
    onPlayerCanplay({ event }) {
      console.log(event.type);
    },
    onPlayerCanplaythrough({ event }) {
      console.log(event.type);
    },
    playerStateChanged({ event }) {
      console.log(event.type);
    },
  },
};
</script>

<style>
.videoplayer {
  width: 500px;
}

.videoplayer-controls {
  display: flex;
  font: 0.8em sans-serif;
  width: 100%;
}

.videoplayer-controls-toggleplay,
.videoplayer-controls-togglemute {
  flex: 1;
}

.videoplayer-controls-time {
  flex: 2;
  text-align: center;
  line-height: 2;
}

.videoplayer-controls-track {
  flex: 5;
  line-height: 2;
}
</style>

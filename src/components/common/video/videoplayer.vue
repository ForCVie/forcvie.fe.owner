<template>
  <div class="videoplayer-container" :style="containerStyles">
    <video
      :src="src"
      :muted="muted"
      :autoplay="autoplay"
      :controls="controls"
      :loop="loop"
      :poster="poster"
      :preload="preload"
      :playsinline="true"
      ref="player"
    />

    <div
      v-if="!playing || videoEnded"
      @click="togglePlay"
      class="play-overlay"
    >
      <svg
        v-if="!videoEnded"
        class="icon-play" 
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
      <svg
        v-else
        class="icon-restart"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
      </svg>
    </div>

    <slot
      name="controls"
      :play="play"
      :pause="pause"
      :toggle-play="togglePlay"
      :playing="playing"
      :percentage-played="percentagePlayed"
      :seek-to-percentage="seekToPercentage"
      :duration="duration"
      :convert-time-to-duration="convertTimeToDuration"
      :video-muted="videoMuted"
      :toggle-mute="toggleMute"
    ></slot>
  </div>
</template>

<script>
const EVENTS = [
  "play",
  "pause",
  "ended",
  "loadeddata",
  "waiting",
  "playing",
  "timeupdate",
  "canplay",
  "canplaythrough",
  "statechanged",
];

export default {
  name: "Videoplayer",
  props: {
    src: { type: String, required: true },
    controls: { type: Boolean, required: false, default: false },
    loop: { type: Boolean, required: false, default: false },
    width: { type: [Number, String], required: false, default: '100%' }, 
    height: { type: [Number, String], required: false, default: 'auto' }, 
    autoplay: { type: Boolean, required: false, default: false },
    muted: { type: Boolean, required: false, default: false },
    poster: { type: String, required: false },
    preload: { type: String, required: false, default: "auto" },
  },
  data() {
    return {
      playing: false,
      duration: 0,
      percentagePlayed: 0,
      videoMuted: false,
      videoEnded: false, 
    };
  },
  computed: {
    containerStyles() {
        const formatValue = (value) => {
            return (typeof value === 'number') ? `${value}px` : value;
        };
        return {
            width: formatValue(this.width),
            height: formatValue(this.height),
        };
    }
  },
  mounted() {
    this.bindEvents();

    if (this.$refs.player.muted) {
      this.setMuted(true);
    }
  },
  methods: {
    bindEvents() {
      EVENTS.forEach((event) => {
        this.bindVideoEvent(event);
      });
    },

    bindVideoEvent(which) {
      const player = this.$refs.player;

      player.addEventListener(
        which,
        (event) => {
          if (which === "loadeddata") {
            this.duration = player.duration;
          }

          if (which === "timeupdate") {
            this.percentagePlayed =
              (player.currentTime / player.duration) * 100;
            
            if (player.currentTime < player.duration) {
                this.videoEnded = false;
            }
          }
          
          if (which === "ended") {
            this.setPlaying(false);
            this.videoEnded = true; 
          }

          this.$emit(which, { event, player: this });
        },
        true
      );
    },

    play() {
      this.$refs.player.play();
      this.setPlaying(true);
      this.videoEnded = false; 
    },

    pause() {
      this.$refs.player.pause();
      this.setPlaying(false);
    },

    togglePlay() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },

    setPlaying(state) {
      this.playing = state;
    },

    seekToPercentage(percentage) {
      this.$refs.player.currentTime = (percentage / 100) * this.duration;
      this.videoEnded = false; 
    },

    convertTimeToDuration(seconds) {
      return [parseInt((seconds / 60) % 60, 10), parseInt(seconds % 60, 10)]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
    },

    mute() {
      this.$refs.player.muted = true;
      this.setMuted(true);
    },

    unmute() {
      this.$refs.player.muted = false;
      this.setMuted(false);
    },

    toggleMute() {
      if (this.videoMuted) {
        this.unmute();
      } else {
        this.mute();
      }
    },

    setMuted(state) {
      this.videoMuted = state;
    },
  },
};
</script>

<style scoped>
.videoplayer-container {
  /* Kích thước được định nghĩa bởi :style="containerStyles" */
  position: relative; 
  display: inline-block;
  /* Quan trọng: Nếu width là 100%, display: block sẽ giúp nó chiếm hết chiều rộng */
}

video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5); 
  border-radius: 50%;
  padding: 15px; 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; 
  transition: background-color 0.2s;
}

.play-overlay:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.play-overlay svg {
  width: 45px; 
  height: 45px;
}

.icon-play {
    margin-left: 5px; 
}
</style>
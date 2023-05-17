<template>
  <div>
    <b-container>
      <h3 class="list-title">{{ listTitle }}</h3>
      <b-row>
        <template v-if="isExist">
          <b-col cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
              @removeItem="onRemoveItem"
              @showModal="onShowMovieInfo"
            />
          </b-col>
        </template>
        <template v-else>
          <div>Empty list</div>
        </template>
      </b-row>
      <b-modal
        body-class="movie-modal-body"
        :id="movieInfoModalID"
        size="xl"
        hide-header
        hide-footer
      >
        <MovieInfoModalContent
          :movie="selectedMovie"
          @closeModal="onCloseModal"
        />
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import MovieItem from "@/components/MovieItem";
import MovieInfoModalContent from "@/components/MovieInfoModalContent";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MoviesList",
  components: {
    MovieItem,
    MovieInfoModalContent
  },
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    movieInfoModalID: "movie-info",
    selectedMovieID: ""
  }),
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    listTitle() {
      return this.isSearch ? "Search result" : "IMDB Top 250";
    },
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    selectedMovie() {
      return this.selectedMovieID ? this.list[this.selectedMovieID] : null;
    }
  },
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    ...mapActions(["showNotify"]),
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Are you sure delete ${title}?`
      );
      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: "Movie deleted successful",
          variant: "success",
          title: "success"
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieID = id;
      this.$bvModal.show(this.movieInfoModalID);
    },
    onCloseModal() {
      this.$bvModal.hide(this.movieInfoModalID);
    }
  }
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #ffffff;
}
</style>

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>

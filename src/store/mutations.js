export default {
    CITY_INFO(state, payload){
        state.nm = payload.nm;
        state.id = payload.id;
      },
      setNmAndId(state,{nm,id}){
        state.nm = nm;
        state.id = id;
      },
      login(state,name){
        state.isLoging = true;
        state.loginUser = name;
      },
      changeMovieId(state,id){
        state.movieId = id;
      },
      changeCinemaId(state,id){
        state.cinemaId = id;
      }
}
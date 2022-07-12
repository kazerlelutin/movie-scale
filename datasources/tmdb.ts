import axios from "axios";

export default  axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: process.env.API_KEY_TMDB,
        language:"fr-Fr"
    }
});
  
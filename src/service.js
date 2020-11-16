import Axios from "axios";

const API_KEY = "AIzaSyCRwBzCfxNyJoUEsdOqnPk_z1SDFEx3buc";

export const getSongs = async (query, pageToken = "") => {
  if (query !== "") {
    return await Axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&maxResults=7&key=${API_KEY}&pageToken=${pageToken}`
    ).catch((e) => console.log(e));
  }
};

export const getSongUrl = async (videoId) => {
  try {
    console.log(videoId);
    const url = `https://www.yt-download.org/api/button/mp3/${videoId}`;
    console.log(url);
    const htmlPage = await Axios.get(url);
    const tempHtml = document.createElement("html");
    tempHtml.innerHTML = htmlPage.data;
    return tempHtml.getElementsByTagName("a")[0].href;
  } catch (err) {
    console.log(err);
  }
};

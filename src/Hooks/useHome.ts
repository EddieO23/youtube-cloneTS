import { useState } from "react";
import { HomeVideoCardType } from "../utils/Types";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;


export const useHome = () => {
  const [homeVideos, setHomeVideos] = useState<HomeVideoCardType[]>([]);


  const fetchHomeVideos = async (filter: string, categoryId: string | null) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics,contentDetails&chart=mostPopular&${categoryId != null ? `videoCategoryId=${categoryId}` : ``}&maxResults=20`
      );
      console.log(response)

      const videoData = response.data.items.map((item: any) => {
        return {
          videoId: item.id,
          videoTitle: item.snippet.title,
          videoThumbnail: item.snippet.thumbnails?.standard?.url || "", // Use optional chaining
          videoDuration: item.contentDetails?.duration || "N/A", // Use optional chaining
          videoViews: item.statistics?.viewCount || "0", // Use optional chaining
          videoAge: item.snippet.publishedAt,
          channelInfo: {
            id: item.snippet.channelId,
            name: item.snippet.channelTitle,
          },
        };
      });

      const channelIds = videoData
        .map((video: HomeVideoCardType) => video.channelInfo.id)
        .join(",");

      const channelResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet&id=${channelIds}`
      );

      const channelData: { [key: string]:  string  } = {};

      channelResponse.data.items.forEach((channel: any) => {
        channelData[channel.id] = channel.snippet.thumbnails.default.url;
      });


const videos = videoData.map((video: HomeVideoCardType) => ({
  ...video,
  channelInfo:{
    ...video.channelInfo,
    image: channelData[video.channelInfo.id]
  }
}))

      setHomeVideos(videos);
    } catch (error) {
      console.error(`Error fetching ${filter} videos:`, error);
    }
  };

  return {homeVideos, fetchHomeVideos}
}
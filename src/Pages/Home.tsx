// import React, { useEffect, useState } from "react";
// import Card from "../Components/Card";
// import axios from "axios";
// import { HomeVideoCard } from "../utils/Types";

// const API_KEY = import.meta.env.VITE_API_KEY;

// function Home() {
//   const [homeVideos, setHomeVideos] = useState<HomeVideoCard[]>([]);

//   const fetchHomeVideos = async () => {
//     const response = await axios.get(
//       `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics&chart=mostPopular&maxResults=20`
//     );
//     // console.log(response.data);

//     const videos = response.data.items.map((item: any) => {
//       return {
//         videoId: item.id,
//         videoTitle: item.snippet.title,
//         videoThumnbnail: item.snippet.thumbnail.standard.url,
//         videoViews: item.statistics.viewCount,
//         videoAge: item.snippet.publishedAt,
//         channelInfo: {
//           id: item.snippet.channelId,
//           name: item.snippet.channelTitle,
//         },
//       };
//     });
//     setHomeVideos(videos)
//   };

//   useEffect(() => {
//     fetchHomeVideos();
//   }, []);

// useEffect(() => {
//   console.log(homeVideos)
// }, [homeVideos])


//   return (
//     <div className="row row-cols-3 w-[95%] mx-auto mt-6">
//       {[...Array(12)].map((item) => (
//         <Card />
//       ))}
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import axios from "axios";
import { HomeVideoCardType } from "../utils/Types";

const API_KEY = import.meta.env.VITE_API_KEY;

function Home() {
  const [homeVideos, setHomeVideos] = useState<HomeVideoCardType[]>([]);

  const fetchHomeVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=20`
      );

      const videos = response.data.items.map((item: any) => {
        return {
          videoId: item.id,
          videoTitle: item.snippet.title,
          videoThumbnail: item.snippet.thumbnails?.standard?.url || '', // Use optional chaining
          videoDuration: item.contentDetails?.duration || 'N/A', // Use optional chaining
          videoViews: item.statistics?.viewCount || '0', // Use optional chaining
          videoAge: item.snippet.publishedAt,
          channelInfo: {
            id: item.snippet.channelId,
            name: item.snippet.channelTitle,
          },
        };
      });
      setHomeVideos(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchHomeVideos();
  }, []);

  useEffect(() => {
    console.log(homeVideos);
  }, [homeVideos]);

  return (
    <div className="row row-cols-3 w-[95%] mx-auto mt-6">
      {homeVideos?.map((item) => (
        <Card data={item}/> // Provide a unique key
      ))}
    </div>
  );
}

export default Home;

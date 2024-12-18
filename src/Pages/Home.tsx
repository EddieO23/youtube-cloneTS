import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import axios from "axios";
import { HomeVideoCardType } from "../utils/Types";
import { useHome } from "../Hooks/useHome";

function Home({
  filter,
  categoryId,
}: {
  filter: string;
  categoryId: string | null;
}) {
  const { homeVideos, fetchHomeVideos } = useHome();

  useEffect(() => {
    fetchHomeVideos(filter, categoryId);
  }, [categoryId]);

  useEffect(() => {
    // console.log(homeVideos);
  }, [homeVideos]);

  return (
    <div className="row row-cols-3 w-[95%] mx-auto mt-6">
       {/* <>{categoryId}</> */}
      {homeVideos?.map((item) => (
        <Card key={item.videoId} data={item} /> // Provide a unique key
      ))}
    </div>
  );
}

export default Home;

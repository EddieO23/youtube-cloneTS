import React from 'react'
import { HomeVideoCardType } from '../utils/Types'

function Card({data}: {data: HomeVideoCardType}) {
  return (
    <div className='flex flex-col gap-3 pb-3'>
      {/* Thumbnnail */}
      <div className="relative">
        {/* <div className="bg-red-300 aspect-[16/9] rounded-xl"></div> */}
        <img className="bg-red-300 aspect-[16/9] object-cover rounded-xl" src={data.videoThumbnail} alt="" />
        <span className='absolute bottom-3 right-3 text-sm bg-[#0c0c0cd0] px-2 py-0.5 rounded'>{data.videoDuration}</span>
      </div>
      {/* Details */}
      <div className="flex gap-2">
        {/* <div className="bg-red-300 aspect-[1/1] rounded-full h-12"></div> */}
        <img src={data.channelInfo.image} className="bg-red-300 aspect-[1/1] rounded-full h-12" alt="" />
        <div className="flex flex-col">
          <h3 className='text-lg line-clamp-2'>{data.videoTitle}</h3>
          <div className="text-md">
            <h4>{data.channelInfo.name}</h4>
            <div className="flex gap-1">
              <span>{data.videoViews}</span>
              <span>.</span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

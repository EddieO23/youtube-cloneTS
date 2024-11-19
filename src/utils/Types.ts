export interface HomeVideoCard {
  videoId: string
  videoTitle: string
  videoThumnbnail: string
  videoDuration: string
  videoViews: string
  videoAge: string
  channelInfo: {
    id: string
    image?: string
    name: string
  }
}
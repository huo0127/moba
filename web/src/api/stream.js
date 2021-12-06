import { twitchRequest } from './request'

export const getStreamList = () => {
  return twitchRequest({
    url: '/streams/',
    params: {
      first: 20,
      game_id: 21779,
    }
  })
}

export const getStreamer = (id) => {
  return twitchRequest({
    url: '/channels/',
    params: {
      broadcaster_id: id
    }
  })
}
export const getStreamerAvatar = (id) => {
  return twitchRequest({
    url: '/users/',
    params: {
      id: id
    }
  })
}

export const getGameInformation = (id) => {
  return twitchRequest({
    url: '/games/',
    params: {
      id: 21779
    }
  })
}
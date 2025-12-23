import api from "./api";

export default async function  fetchData () {
    const channels = await api.get ('/chanels')
    const messages =  await api.get ('/messages')
    return {
        channels: channels.data,
        messages: messages.data
    }
}
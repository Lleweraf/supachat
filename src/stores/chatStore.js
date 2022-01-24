import { writable } from 'svelte/store'
import { supabase } from '../supabase.js'
export const chat = writable([])

let isAdded = false

export const loadChat = async () => {
  //load all chat first
  const { data, error } = await supabase.from('global_chat').select()
  chat.set(data)

  //subscribe for changes
  const mySubscription = supabase
    .from('global_chat')
    .on('*', (payload) => {
      console.log('Change received!', payload)
      chat.set([...data, payload.new])
    })
    .subscribe()
}

export const sendMessage = async (username, message) => {
  const { data, error } = await supabase.from('global_chat').insert([{ username, message }])

  if (error) {
    return console.error(error)
  }

  return (isAdded = true)
}

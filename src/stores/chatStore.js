import { writable, readable, get } from 'svelte/store'
import { supabase } from '../supabase.js'
export const chat = writable([])
export const userName = readable(null, (set) => {
  set(localStorage.getItem('supachatUsername'))
})

let isAdded = false

export const loadChat = async () => {
  //loads 50 most recent chat
  const { data, error } = await supabase.from('global_chat').select().order('id', { ascending: true }).limit(50)
  chat.set(data)

  //subscribe for changes
  const mySubscription = supabase
    .from('global_chat')
    .on('*', (payload) => {
      console.log('Change received!', payload)
      chat.set([...data, payload.new])
      loadChat()
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

// Add username and timestamp when it was created.
export const addUserdata = (username, timestamp) => {
  let isOver24hrs = computeDate(loadUserdata().tempDate)

  if (loadUserdata().tempUser == null) {
    setUserdata(username, timestamp)
    console.log('Username added to localstorage')
  }

  if (loadUserdata().tempUser === username && isOver24hrs) {
    setUserdata(username, timestamp)
    console.log('Username added to localstorage')
  } else {
    console.log('Username already exists. You must wait 24 hrs. to change.')
  }
}

// Adds user data into localstorage
export const setUserdata = async (username, timestamp) => {
  localStorage.setItem('supachatUsername', username)
  localStorage.setItem('supachatTimestamp', timestamp)
}

// Retrieve user data from localstorage
export const loadUserdata = async () => {
  let tempUser = localStorage.getItem('supachatUsername')
  let tempDate = localStorage.getItem('supachatTimestamp')

  computeDate(tempDate)
  return { tempUser, tempDate }
}

//Check time interval (24 Hrs)
export const computeDate = (tempDate) => {
  let prevTime = new Date(tempDate)
  let thisTime = new Date()
  let diff = thisTime.getTime() - prevTime.getTime()
  let lapsedTime = diff / 3600000

  if (lapsedTime > 24) {
    localStorage.clear()
    return true
  } else {
    return false
  }
}

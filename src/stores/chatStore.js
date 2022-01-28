import { supabase } from '../supabase.js'
import { writable, get } from 'svelte/store'
export const chat = writable([])

let isAdded = false
let initChatCount = 50

export const loadChat = async () => {
  const { data, error } = await supabase
    .from('global_chat')
    .select()
    .order('id', { ascending: true })
    .limit(initChatCount)
  chat.set(data)

  const mySubscription = supabase
    .from('global_chat')
    .on('INSERT', (payload) => {
      chat.set([...data, payload.new])
      loadChat()
    })
    .subscribe()
}

export const loadMore = async () => {
  const { data, error } = await supabase
    .from('global_chat')
    .select()
    .order('id', { ascending: true })
    .limit((initChatCount += 20))
  chat.set(data)
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

  if (loadUserdata().tempUser == null || (loadUserdata().tempUser === username && isOver24hrs)) {
    setUserdata(username, timestamp)
  }
}

// Adds user data into localstorage
export const setUserdata = async (username, timestamp) => {
  localStorage.setItem('supachatUsername', username)
  localStorage.setItem('supachatTimestamp', timestamp)
}

// Retrieve user data from localstorage
export const loadUserdata = async () => {
  if (typeof localStorage != undefined) {
    let tempUser = localStorage.getItem('supachatUsername')
    let tempDate = localStorage.getItem('supachatTimestamp')

    computeDate(tempDate)
    return { tempUser, tempDate }
  } else {
    localStorage.clear()
  }
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

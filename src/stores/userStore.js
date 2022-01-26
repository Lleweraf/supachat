import { supabase } from '../supabase.js'
import { writable } from 'svelte/store'
import { browser } from '$app/env'

export const atot = writable((browser && localStorage.getItem('supachatUsername')) || '')

//check if user if exists
export const checkUser = async (username) => {
  const { data, error } = await supabase.from('users').select().match({ username })
  if (error) {
    return console.error(error)
  }

  return data
}

//Add user to database
export const addUser = async (username) => {
  const { data, error } = await supabase.from('users').insert([{ username }])

  if (error) {
    return console.error(error)
  }

  return true
}

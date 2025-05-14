// import { createClient } from '@/utils/supabase/server'

// export default async function Page() {
//   const supabase = await createClient()
//   const { data: notes } = await supabase.from('notes').select()

//   return <pre>{JSON.stringify(notes, null, 2)}</pre>
// }

'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('car').select('id, name').order('id', {ascending: true})
      setNotes(data)
    }
    getData()
  }, [])

  const updateCar = async () => {
    await supabase.from("car").update({ name: "Riya's defender ❤️" }).eq('id', 1).select();
  }

  return <div>
    <h1>Update</h1>
    <button className='bg-purple-400 p-2 rounded-sm shadow-sm' onClick={() => updateCar()}>Update Car name</button>
    <pre>{JSON.stringify(notes, null, 2)}</pre>
  </div>
}
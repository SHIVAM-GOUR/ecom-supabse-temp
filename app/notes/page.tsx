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
  const [carName, setCarName] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('car').select('id, name').order('id', {ascending: true})
      setNotes(data)
    }
    getData()
  }, [])

  const updateCar = async () => {
    await supabase.from("car").update({ name: carName}).eq('id', 1).select();
    const { data } = await supabase.from('car').select('id, name').order('id', { ascending: true })
    setNotes(data)
  }

  return <div className='flex flex-col'>
    <h1>Update car name</h1>
 <input
        type="text"
        placeholder="Enter new car name"
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
        className="p-2"
      />
    <button className='bg-purple-400 p-2 rounded-sm shadow-sm my-4' onClick={() => updateCar()}>Update Car name</button>
    <pre>{JSON.stringify(notes, null, 2)}</pre>
  </div>
}

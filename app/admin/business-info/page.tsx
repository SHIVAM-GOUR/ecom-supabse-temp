'use client'
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout'

// this componet is to update business info
const AdminBusinessInfo = () => {

    const [notes, setNotes] = useState<any[] | null>(null)
    const [carName, setCarName] = useState('')
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('business_info').select().order('id', { ascending: true })
            setNotes(data)
        }
        getData()
    }, [])
    return (
        <div>
            <h1 className='text-lg'>Admin business info page to update business info</h1>
            <p><i>1. created a row in business_info table and we'll update the same row to update this business info</i> </p>
            <p><i>2. check out the sql file in the project that created for the setup table creation, file name : 1-setup.pgsql</i></p>
            <pre>{JSON.stringify(notes, null, 2)}</pre>

        </div>
    )
}

export default AdminBusinessInfo

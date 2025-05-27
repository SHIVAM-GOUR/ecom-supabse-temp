'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const UpdateBusinessName = () => {
    const supabase = createClient()

    const [status, setStatus] = useState('Update');
    const [data, setData] = useState<any[] | null>(null)
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('business_info').select().order('id', { ascending: true })
            setData(data)
        }
        getData()
    }, [])

    // update business info api call with new implementation
    // const updateBusinessInfoHandler = async () => {
    //     setStatus('updating...');
    //     try {
    //         const formData = new FormData();

    //         formData.append('id', '1');
    //         if (file) {
    //             formData.append('logo', file);
    //         }
    //         formData.append('name', 'shivam updated');

    //         const res = await fetch('/api/business', {
    //             method: 'PATCH',
    //             body: formData
    //         });

    //         const data = await res.json();

    //         if (!res.ok) {
    //             throw new Error(data.error || 'Failed to update');
    //         }

    //         setData(data.data);
    //         setStatus('Update');
    //     } catch (error: any) {
    //         setStatus('Error: ' + error.message);
    //     }
    // };

    // old implementation
    const updateBusinessInfoHandler = async () => {
        setStatus('updating...');
        try {
            const res = await fetch('/api/business', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 1, // example row ID
                    [key]: value,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update');
            }

            setData(data.data);
            setStatus('Update');
        } catch (error: any) {
            setStatus('Error: ' + error.message);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setFile(file)
        }
    };

    return (
        <div>
            {/* <div>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                />
            </div> */}
            <div>
                <input placeholder='key' className='border border-blue-600 p-1 m-1' onChange={(e) => setKey(e.target.value)}></input>
                <input placeholder='value' className='border border-blue-600 p-1 m-1' onChange={(e) => setValue(e.target.value)}></input>
            </div>
            <button className='bg-blue-400 p-2 rounded-md' onClick={updateBusinessInfoHandler}>{status}</button>
            <div className='bg-gray-200'>
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default UpdateBusinessName;

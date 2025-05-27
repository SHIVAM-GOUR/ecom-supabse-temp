import { createClient } from '@/utils/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// export async function PATCH(req: NextRequest) {
//     try {
//         const supabase = createClient();

//         // Parse form data
//         const formData = await req.formData();

//         const id = formData.get('id')?.toString();
//         if (!id) {
//             return NextResponse.json({ error: 'Missing "id" in form data' }, { status: 400 });
//         }

//         const updates: Record<string, any> = {
//             updated_at: new Date().toISOString(),
//         };

//         console.log("api called");
//         // Upload image if present
//         const file = formData.get('logo') as File | null;
//         if (file && file.name) {
//             console.log("file received");
//             const fileExt = file.name.split('.').pop();
//             const fileName = `${uuidv4()}.${fileExt}`;
//             const filePath = `upload/${fileName}`;
//             console.log("fileExt, fileName, filePath - ", fileExt, fileName, filePath);

//             const { error: uploadError } = await supabase.storage
//                 .from('storage-bucket') // Replace with your bucket name
//                 .upload(filePath, file, {
//                     contentType: file.type,
//                     upsert: true,
//                 });

//             console.log("upload image error: ", uploadError);
//             if (uploadError) throw uploadError;


//             const { data: publicUrlData } = supabase
//                 .storage
//                 .from('storage-bucket')
//                 .getPublicUrl(filePath);

//             updates.logo_link = publicUrlData.publicUrl;
//         }

//         // Add other fields from the form
//         for (const [key, value] of formData.entries()) {
//             if (key !== 'id' && key !== 'logo_link' && value !== null && key != "updated_at") {
//                 updates[key] = value;
//             }
//         }

//         const { data, error } = await supabase
//             .from('business_info')
//             .update(updates)
//             .eq('id', id)
//             .select();

//         if (error) throw error;

//         return NextResponse.json({
//             message: 'business info updated successfully',
//             data
//         });

//     } catch (err: any) {
//         return NextResponse.json(
//             { error: err.message || 'Something went wrong' },
//             { status: 500 }
//         );
//     }
// }

// update business info api
export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, ...rest } = body;
        if (!id) {
            return NextResponse.json({ error: 'Missing "id" in request body' }, { status: 400 });
        }


        // Filter out undefined or null values
        const updates = Object.fromEntries(
            Object.entries(rest).filter(([key, value]) =>
                value !== undefined &&
                value !== null &&
                key !== 'id' &&
                key !== 'updated_at'
            )
        );
        updates.updated_at = new Date().toISOString();

        const supabase = createClient();
        const { data, error } = await supabase
            .from('business_info')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) throw error;

        return NextResponse.json({
            message: 'Business info updated successfully',
            data
        });

    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'Something went wrong' },
            { status: 500 }
        );
    }
}
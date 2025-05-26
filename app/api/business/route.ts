import { createClient } from '@/utils/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

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


        const supabase = await createClient();

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
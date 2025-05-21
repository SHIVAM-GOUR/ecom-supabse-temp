import { createClient } from '@/utils/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    if (req.method != 'GET') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }

    const supabase = createClient();
    try {
        const { data, error } = await supabase.from('product').select(
            `   id,
                name,
                description_primary,
                description_secondary,
                price,
                is_visible,
                created_at,
                updated_at,
                product_category (
                    id,
                    name,
                    description
                ),
                business_info (
                    id,
                    name
                )`
        )
        if (error) {
            return NextResponse.json({ error: 'error in getting data' }, { status: 500 })
        }

        return NextResponse.json({
            data
        })
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'Something went wrong' },
            { status: 500 }
        );
    }

}
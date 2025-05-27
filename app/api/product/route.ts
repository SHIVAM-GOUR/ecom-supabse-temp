import { createClient } from '@/utils/supabase/client';
import { NextApiRequest, NextApiResponse } from 'next';
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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      images,
      description_primary,
      description_secondary,
      price,
      is_visible = true,
      category_id,
      business_id,
    } = body;

    if (!name || !category_id || !business_id) {
      return NextResponse.json(
        { message: 'Missing required fields: name, category_id, business_id' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('product')
      .insert([
        {
          name,
          images,
          description_primary,
          description_secondary,
          price,
          is_visible,
          category_id,
          business_id,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(
      { message: 'Product added successfully', product: data?.[0] },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error adding product', error: error.message },
      { status: 500 }
    );
  }
}


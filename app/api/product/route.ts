import { createClient } from '@/utils/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient();

// GET PRODUCTS API
export async function GET(req: NextRequest) {
    if (req.method != 'GET') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }

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


// ADD PRODUCTS API
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


// UPDATE PRODUCT API
export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      name,
      images,
      description_primary,
      description_secondary,
      price,
      is_visible,
      category_id,
      business_id,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: 'Missing required field: id' },
        { status: 400 }
      );
    }

    const updates: any = {
      updated_at: new Date().toISOString(),
    };

    if (name !== undefined) updates.name = name;
    if (images !== undefined) updates.images = images;
    if (description_primary !== undefined) updates.description_primary = description_primary;
    if (description_secondary !== undefined) updates.description_secondary = description_secondary;
    if (price !== undefined) updates.price = price;
    if (is_visible !== undefined) updates.is_visible = is_visible;
    if (category_id !== undefined) updates.category_id = category_id;
    if (business_id !== undefined) updates.business_id = business_id;

    const { data, error } = await supabase
      .from('product')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json(
      { message: 'Product updated successfully', product: data?.[0] },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error updating product', error: error.message },
      { status: 500 }
    );
  }
}
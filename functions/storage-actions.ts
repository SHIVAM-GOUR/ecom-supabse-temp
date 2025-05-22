import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js"

type UploadFileResponse = {
    data: any | null,
    error: Error | null
}

export async function uploadFileOnDB(
    filePath: string,
    file: File
): Promise<UploadFileResponse> {

    const supabase = createClient();
    const { data, error } = await supabase.storage.from('storage-bucket').upload(filePath, file)

    return {
        data,
        error
    }
}
import { createClient } from "@supabase/supabase-js";
import { error } from "cros/common/logger";

const url = "https://qxrvrgqqlxhuolzgrciu.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cnZyZ3FxbHhodW9semdyY2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxOTQ2NzQsImV4cCI6MjA3ODc3MDY3NH0.mjcEKyrJ6dTnnJvDhAzqOLIpoAX0pSi3rb8FUtR95eo"

const supabase = createClient(url,key)

export default function uploadFile(file){

    return new Promise(
        (resolve, reject)=>{
            const timeStamp = Date.now()
            const fileName = timeStamp + "_" + file.name
            supabase.storage.from("images").upload(fileName, file ,{
                cacheControl:"3600",
                upsert:false,
            }).then(()=>{
                const publicurl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                resolve(publicurl)
            }).catch((error)=>{
                reject(error)
            })
        }
    )
}
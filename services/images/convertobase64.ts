"use client"
export async function convertToBase64(file:File):Promise<ArrayBuffer | string | null> {

    return new Promise((resolve , reject)=>{
        const reader = new FileReader()

        reader.onload = ()=> resolve(reader.result)
        reader.onerror = (e)=> reject(e)
        reader.readAsDataURL(file)
    })
}
export async function convertToBase64(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);

    reader.onerror = (er)=> reject(er)

    reader.readAsDataURL(file)
  });
}
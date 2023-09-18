export async function fieldRequest<T>(url: string): Promise<T> {
  const raw = await fetch(url)
  const data = await raw.json()
  return data as T
}

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function withBasePath(href: string) {
  if (!basePath || !href.startsWith('/')) return href
  if (href === '/') return basePath
  return `${basePath}${href}`
}

export function stripBasePath(pathname: string) {
  if (!basePath || !pathname.startsWith(basePath)) return pathname
  return pathname.slice(basePath.length) || '/'
}

import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName, headerName } from '@/lib/i18n/settings'

acceptLanguage.languages([...languages])

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
}

function getLocale(request: NextRequest): string {
  let lng: string | null = null

  if (request.cookies.has(cookieName)) {
    lng = request.cookies.get(cookieName)?.value ?? null
  }

  if (!lng) {
    lng = acceptLanguage.get(request.headers.get('Accept-Language'))
  }

  if (!lng) {
    lng = fallbackLng
  }

  return lng
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/_next') || pathname.includes('/api/')) {
    return NextResponse.next()
  }

  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const locale = languages.find(
      (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
    )

    const response = NextResponse.next()

    if (locale) {
      response.headers.set(headerName, locale)

      if (request.cookies.get(cookieName)?.value !== locale) {
        response.cookies.set(cookieName, locale, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
          sameSite: 'lax',
        })
      }
    }

    return response
  }

  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  newUrl.search = request.nextUrl.search

  const response = NextResponse.redirect(newUrl)

  response.cookies.set(cookieName, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  return response
}

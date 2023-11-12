import { DefaultLayout } from './DefaultLayout'
import React from 'react';

export type GetLayout<Props = any> = (
  page: React.ReactNode,
  pageProps: Props,
  path: string
) => React.ReactElement

export const getDefaultLayout: GetLayout = (page, pageProps, path) => {
  const isHome = path === '/'
  const isAuthPage = path.startsWith('/login')
  const isAccountPage = path.startsWith('/account')
  const isProductLandingPage = path.startsWith('/takeout') || path.startsWith('/studio')
  const isBlog = path.startsWith('/blog')

  const layout = (
    <DefaultLayout
      headerProps={{
        disableNew: isBlog || isAuthPage || isProductLandingPage || isAccountPage,
        minimal: isAuthPage || isProductLandingPage || isAccountPage,
        showAuth: isAuthPage || isProductLandingPage || isAccountPage,
      }}
    >
      {page}
    </DefaultLayout>
  )

  return layout
}



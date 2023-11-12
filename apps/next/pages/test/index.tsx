import { TestScreen } from 'app/bundles/test/screen'
import { getServerSideProps } from 'next/dist/build/templates/pages'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <TestScreen />
    </>
  )
}

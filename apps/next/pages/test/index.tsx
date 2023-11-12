import { TestScreen } from 'app/bundles/test/screen'
import { API } from 'sixedge'

export default function Page(props: any) {
  return (
    <>
      <TestScreen {...props}/>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const data = await API("/api/v1/test", "GET")
 
  // Pass data to the page via props
  return { props: { data: data } }
}
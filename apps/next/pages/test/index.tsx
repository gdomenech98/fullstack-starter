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
  let data = "not loaded data";
  try {
    data = await API("/api/v1/test", "GET")
  }catch(e){
  }
 
  // Pass data to the page via props
  return { props: { data: data } }
}
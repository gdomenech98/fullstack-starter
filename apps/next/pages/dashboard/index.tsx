import { DashBoardScreen } from 'app/bundles/dashboard/screen'

export default function Page(props: any) {
  return (
    <>
      <DashBoardScreen {...props}/>
    </>
  )
}

export async function getServerSideProps() {
  const data = [{
    id: "1",
    identifier: "lol@lol.lol",
    type:"admin",
    password: "lol"
  },
  {
    id: "2",
    identifier: "lel@lel.lel",
    type:"user",
    password: "lel "
  },
  {
    id: "3",
    identifier: "li@li.li",
    type:"user",
    password: "li"
  },
  {
    id: "4",
    identifier: "uau@uau.uau",
    type:"admin",
    password: "uau"
  }]
  // Pass data to the page via props
  return { props: { data: data } }
}
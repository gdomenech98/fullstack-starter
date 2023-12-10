import { LoginScreen } from 'app/bundles/auth/login/screen'

export default function Page(props: any) {
    return (
        <>
            <LoginScreen {...props} />
        </>
    )
}

export async function getServerSideProps() {
    return { props: {} }
}
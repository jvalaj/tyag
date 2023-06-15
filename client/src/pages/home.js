import { useAuth } from "../context/auth";
const Home = () => {

    const [auth, setAuth] = useAuth()

    return (
        <div className="h-[80vh] text-center">
            Home

            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
    )
}

export default Home;
import { auth } from "../server/auth";


export default async function Home() {
  const session = await auth()
  return (
    <main className="">
      {JSON.stringify(session)}
    </main>
  )
}

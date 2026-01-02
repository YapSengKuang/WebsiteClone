import { auth } from "../server/auth";
import { signIn } from "../server/auth";

export default async function Home() {
  const session = await auth()
  return (
    <main>
      <div className="min-h-screen grid grid-cols-2">
        <div className="flex items-center justify-center">
          test
        </div>
        <div className="flex items-center justify-center">
          esrse
        </div>
      </div>
      
    </main>

  )
}

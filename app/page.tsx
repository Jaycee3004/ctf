import { atom } from "jotai"
import SignIn from "./(auth)/signin/page"

export default function Page() {
    const challenge1Atom = atom(false)
    return (
 
                <SignIn></SignIn>
    
    )
}
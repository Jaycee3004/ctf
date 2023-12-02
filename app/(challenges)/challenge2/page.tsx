'use client'
import { useState,useEffect, use } from "react"
import IntervalChecker from "../intervalChecker"
import Image from "next/image"
import { challengeTwoAtom } from "../../atoms"
import { useAtomValue,useSetAtom } from "jotai"
import { updateScore } from "../intervalChecker"
import firebase from '../../../firebase/clients'
import { useRouter } from "next/navigation"

type User = firebase.User;

export default function Challenge2() {

    const [name, setName] = useState('')
    const setter = useSetAtom(challengeTwoAtom)
    const challengeTwoAtomValue = useAtomValue(challengeTwoAtom)
    // const [enableUnsafe, setEnableUnsafe] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [success, setSuccess] = useState(false)
    const [recentlyTry, setRecentlyTry] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        // setEnableUnsafe(true)
        setName(e.target.input1.value)
        setUserInput('')
        setRecentlyTry(true)

        
    }
    // const [lastExecutionTime, setLastExecutionTime] = useState(Date.now());
    
    // let challengeComplete = true //useAtomValue(challenge1Atom)
    // const [challengeComplete, setChallengeComplete] = useState(useAtomValue(challengeOneAtom));
    function createMarkup() {

        return {__html: name};
    }

    // useEffect(() => {
    //     if (challengeTwoAtomValue) {
    //         if(challengeTwoAtomValue === true) {
    //             setSuccess(true)
    //         }
    //     }
    // },[challengeTwoAtomValue])
    useEffect(() => {
        if (name === "Tenochtitlan") {
            if (user) {
                updateScore(user.uid,setter,"2")
            }
            setSuccess(true)
        }
    },[name])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                console.log(user)
            } else {
                router.push('/signin');
            }
        });

        // user ? readScore(user.uid) : null
    }, [router]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          
          const win = window;
          window.addEventListener('keydown', function(event){ 
            
            // All the shortcuts
            if (event.key == "F12" || ((event.ctrlKey || event.altKey) && (event.code == "KeyI" || event.key == "KeyJ" || event.key == "KeyU"))) {
                event.preventDefault(); 
                return false;
            }
        });
        // Riight click
        window.addEventListener('contextmenu', function(event){ 
            event.preventDefault();
            return false;
        });
          console.log(win.innerWidth);
        }
      }, []);

    
    // useEffect(() => {
    //     console.log("Goin here")
    //     setTimeout(() => {
            
    //         setName('')
    //     }, 20);
    // },[name])


    useEffect(()=>{
        setTimeout(() => {
            setRecentlyTry(false)
        }, 1000*5);
    },[recentlyTry])


    const imageToggle = useAtomValue(challengeTwoAtom)
    
    return (



        <div>
                <div hidden>
                    <p>CAt's name is VGVub2NodGl0bGFu. Its parent is a soldier stationed at Naval Base 64. Hmm... </p>
                </div>
               {/* <IntervalChecker/> */}
        <div className="flex flex-col h-screen content-denter">
            <div className="p-4">
            <h1 className=" mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-black">Challenge 2:  Call  the Cat</h1>
                {/* <!-- Top bar --> */}
                
            </div>
            <div className="flex-1 flex">
                {/* <!-- Side by side layout --> */}
                <div className="w-1/2 p-4">
                {/* <!-- Left image container --> */}
                <div className="h-full w-full bg-gray-100 flex items-center justify-center border border-gray-300 rounded">
                    {imageToggle && <Image 
                    src="/cat.gif" 
                    alt="Example" 
                    width={500}  // Set the width
                    height={300} // Set the height
                />}
                {!imageToggle && <Image 
                    src="/boxed_cat.gif" 
                    alt="Example" 
                    width={500}  // Set the width
                    height={300} // Set the height
                />}
                </div>
                </div>
                <div className="w-1/2 p-4">
                {/* <!-- Right form container --> */}
                <div className=" w-full bg-gray-100 flex items-center  border border-gray-300 rounded ">

                    
                    <form onSubmit={handleSubmit} className="rounded m-8  bg-gray-900 rounded-xl w-full">
                        {/* <input id="input1" type="text" placeholder="input from user" className="p-2 border border-gray-300 rounded mb-4" value={userInput} onChange={(e)=>{setUserInput(e.target.value)}}/>
                        <button type='submit' className="p-2 bg-blue-500 text-white rounded" >Submit</button> */}
                        <div className="mb-6 m-8">
                            <label className=" text-md font-extrabold leading-none tracking-tight text-gray-900  lg:text-xl dark:text-white">Speaker</label>
                            {/* <input type="text" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="try command :"/> */}
                            {success && <input id="input1" type="text" placeholder="Try out names..." className="font-extrabold leading-none tracking-tight m-2 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3.5 dark:bg-gray-700 dark:border-green-500" value={userInput} onChange={(e)=>{setUserInput(e.target.value)}}/>}
                            {!success && <input id="input1" type="text" placeholder="Try out names..." className="font-extrabold leading-none tracking-tight m-2 bg-white-50 border border-black-500 text-green-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-500" value={userInput} onChange={(e)=>{setUserInput(e.target.value)}}/>}
                            
                            {/* <input id="input2" type="text" placeholder="try command:" className="m-2 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3.5 dark:bg-gray-700 dark:border-green-500" value={userInput} onChange={(e)=>{setUserInput(e.target.value)}}/> */}
                            <button type='submit' className="font-extrabold leading-none  m-2 p-2 bg-blue-500 text-white rounded" >Submit</button>
                        {success && <p className="mt-2 font-extrabold leading-none tracking-tight text-sm text-green-600"><span className="font-medium">Well done!</span> The cat HEARD you !</p>}
                        {!success && recentlyTry &&
                        <div>
                            <p className="mt-2 text-sm text-gray-400"><span className="font-medium">Try Again</span> </p>
                        </div>
                        
                        }
                        
                        </div>
                    </form>
                </div>

                <div className=" w-full bg-gray-100 flex items-center  border border-gray-300 rounded ">
                    <div className="rounded m-4  bg-gray-300 rounded-xl w-full">
                        <div className="mb-6 m-8">
                            <p className=" text-sm font-extrabold leading-none tracking-tight text-gray-900  lg:text-xl ">Goal:</p>

                            <p className=" text-sm font-extrabold leading-none tracking-tight text-gray-900  lg:text-md "> -------- </p>
                            <p className=" text-sm font-extrabold leading-none tracking-tight text-gray-900  lg:text-md "> Find the name of the cat.</p>
                            <br></br>
                            <p className=" text-sm font-extrabold leading-none tracking-tight text-gray-900  lg:text-xl ">How:</p>
                            <p className=" text-sm font-extrabold leading-none tracking-tight text-gray-900  lg:text-md "> -------- </p>

                            <p className=" text-sm font-extrabold leading-none tracking-tight text-gray-900  lg:text-md ">This challenge is about inspecting <span className="text-red-600">DOM</span> structure of a webpage and finding clues. </p>
                            <p className=" text-sm font-extrabold leading-none tracking-tight text-gray-900  lg:text-md ">You might find inspecting just a tad bit hard</p>
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
        </div>
    );
}

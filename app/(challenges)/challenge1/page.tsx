'use client'
import { useState,useEffect, use } from "react"
import IntervalChecker from "../intervalChecker"
import Image from "next/image"
import { challengeOneAtom } from "../../atoms"
import { useAtomValue,useSetAtom } from "jotai"



export default function Challenge1() {

    const [name, setName] = useState('')
    const setter = useSetAtom(challengeOneAtom)
    const [enableUnsafe, setEnableUnsafe] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        setEnableUnsafe(true)
        setName(e.target.input1.value)
        
    }
    // const [lastExecutionTime, setLastExecutionTime] = useState(Date.now());
    
    // let challengeComplete = true //useAtomValue(challenge1Atom)
    // const [challengeComplete, setChallengeComplete] = useState(useAtomValue(challengeOneAtom));
    function createMarkup() {

        return {__html: name};
    }
    useEffect(() => {
        console.log("Goin here")
        setTimeout(() => {
            
            setName('')
        }, 50);
    },[name])
    const a = useAtomValue(challengeOneAtom)
    
    return (
        // <div>

        //     <h1>Challenge 1</h1>
        //     <IntervalChecker/>

        //     <div>
        //         {a && <Image 
        //             src="/cat.gif" 
        //             alt="Example" 
        //             width={500}  // Set the width
        //             height={300} // Set the height
        //         />}
        //         {!a && <Image 
        //             src="/boxed_cat.gif" 
        //             alt="Example" 
        //             width={500}  // Set the width
        //             height={300} // Set the height
        //         />}
        //     </div>
        //     <div className="bg-gray-700 centre justified rounded-e-xl">
        //         <p className="text-gray-100">Hello <span dangerouslySetInnerHTML={createMarkup()}></span></p>
        //     </div>
        //     <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            
        // </div>

        <div>
               <IntervalChecker/>
        <div className="flex flex-col h-screen content-denter">
            <div className="p-4">
            <h1 className=" mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-black">Challenge 1:  Alert the Cat</h1>
                {/* <!-- Top bar --> */}
                <p className="text-gray-100">Hello <span dangerouslySetInnerHTML={createMarkup()}></span></p>
            </div>
            <div className="flex-1 flex">
                {/* <!-- Side by side layout --> */}
                <div className="w-1/2 p-4">
                {/* <!-- Left image container --> */}
                <div className="h-full w-full bg-gray-100 flex items-center justify-center border border-gray-300 rounded">
                    {a && <Image 
                    src="/cat.gif" 
                    alt="Example" 
                    width={500}  // Set the width
                    height={300} // Set the height
                />}
                {!a && <Image 
                    src="/boxed_cat.gif" 
                    alt="Example" 
                    width={500}  // Set the width
                    height={300} // Set the height
                />}
                </div>
                </div>
                <div className="w-1/2 p-4">
                {/* <!-- Right form container --> */}
                <div className="h-full flex flex-col justify-between">
                    <form onSubmit={handleSubmit}>
                        <input id="input1" type="text" placeholder="input from user" className="p-2 border border-gray-300 rounded mb-4" />
                        <button type='submit' className="p-2 bg-blue-500 text-white rounded" >Submit</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
        </div>
    );
}

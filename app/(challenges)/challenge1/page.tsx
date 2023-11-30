'use client'
import { useState,useEffect, use } from "react"
import IntervalChecker from "../intervalChecker"



export default function Challenge1() {

    const [name, setName] = useState('')
    // const [lastExecutionTime, setLastExecutionTime] = useState(Date.now());
    const tempo ="secret"
    function createMarkup() {

        return {__html: name};
    }

    
    
    return (
        <div>
            <h1>Challenge 1</h1>
            <IntervalChecker/>
            <div className="bg-gray-700 flex centre justified rounded-e-xl">
                <p className="text-gray-100">Hello <span dangerouslySetInnerHTML={createMarkup()}></span></p>
            </div>
            <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
        </div>
    );
}

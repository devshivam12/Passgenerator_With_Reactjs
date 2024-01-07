import React,{useState, useEffect, useRef, useCallback} from 'react'


function Passgenerator() {
    
    const [length, setLength] = useState(8);
    const [numberAllowed , setNumberAllowed] = useState(false);
    const [charecterAllowed, setCharecterAllowed] = useState(false);
    const [password, setPassword] = useState("");

    // Using useRef Hook 

    const passRef = useRef(null);

    // Using useCallback hook 

    const passwordGenerator = useCallback(()=>{
            let pass = ""
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

            if(numberAllowed) str+= "0123456789";
            if(charecterAllowed) str+= "!@#$%^&*";


            for(let i = 1; i<=length; i++){
                let char = Math.floor(Math.random()*str.length + 1)

                pass += str.charAt(char);
            }
            setPassword(pass)
    }, [length, numberAllowed, charecterAllowed, setPassword])


    // For copy password using useRef hook

    const copyPasswrod = useCallback(()=>{
        passRef.current?.select()
        window.navigator.clipboard.writeText(password)
    },[password])
    
    // Using useEffect hook 

    useEffect(()=>{
        passwordGenerator()
    }, [length, numberAllowed, charecterAllowed, passwordGenerator])


    return (
        <div>
            <div className='mx-auto mt-10 flex items-center justify-center '>
                <div className='bg-slate-700 w-2/5 p-9 text-orange-500 rounded-xl'>
                    <h1 className='text-center mb-5 text-3xl'>Password Ganerator</h1>

                    <div className='flex items-center justify-center'>
                        <input className='w-full py-3 px-3 rounded-md'

                            value={password}
                            placeholder='password'
                            type="text"
                            readOnly
                            ref={passRef} />
                        <button className='ml-2 block bg-orange-500 text-white w-32 py-3 px-3 rounded-md' 
                        onClick={copyPasswrod}
                        >Copy Pass</button>
                    </div>

                    <div className='flex text-md gap-x-3 mt-5'>
                        <div className='flex items-center gap-x-1  '>
                            <input

                                type="range"
                                min={6}
                                max={100}
                                value={length}
                                className='cursor-pointer'
                                onChange={(e)=>{
                                    setLength(e.target.value)
                                }} />
                            <label htmlFor="">Length: {length}</label>
                        </div>
                        <div className='flex items-center gap-x-1 '>
                            <input className=' outline-none border-none rounded-md'

                                placeholder=''
                                type="checkbox"
                                onChange={(prev)=>{
                                    setNumberAllowed((prev => !prev))
                                }}
                            />
                            <label>Number</label>
                        </div>

                        <div className='flex items-center gap-x-1 '>
                            <input className=' outline-none border-none rounded-md'

                                placeholder=''
                                type="checkbox"
                                onChange={(prev)=>{
                                    setCharecterAllowed((prev => !prev))
                                }}
                            />
                            <label>Charecters</label>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Passgenerator

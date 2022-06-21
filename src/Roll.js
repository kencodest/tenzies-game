import React, {useEffect} from 'react';
import Die from "./Die"
import Track from "./Track"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function Roll() {

    const dispatch = useDispatch()
    const dice = useSelector((state) => state.dice.value )

    const [allDice, setAllDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [trys, setTrys] = React.useState(0)
    const [score, setScore] = React.useState(0)

    useEffect(() => {
        const allHeld = allDice.every((item) => item.isHeld)
        const firstValue = allDice[0].value
        const allValueSame = allDice.every(die => die.value === firstValue)
        if(allHeld && allValueSame) {
            setTenzies(true)
        }
    }, [allDice])
    
        function allNewDice() {
            const newDice = []
            for (let i = 0; i < 10; i++) {
                newDice.push({
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                    id: nanoid()
                })
            } 
            return newDice
        }

    function holdDice(id){
        setAllDice(oldDice => oldDice.map(dice => {
            return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
        }))
    }
        
    const elements = allDice.map((item) => {
        return <Die key={item.id} number={item.value} isHeld={item.isHeld} holdDice={() => holdDice(item.id)} />
    })

    function roll(){
        setAllDice(dice => dice.map(item => {
            return item.isHeld === false ? {value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()} : item
        }))
        setTrys(prevState => prevState + 1)
    }

    function resetGame(){
        setAllDice(allNewDice())
        setTenzies(false)
        // Set Record to Local Storage
        //Set records to session storage
        const storageScore = JSON.parse(sessionStorage.getItem('score'))
        if(trys < storageScore || storageScore === 0 || !storageScore) {
            sessionStorage.setItem('score', JSON.stringify(trys))
        }
        setTrys(0)
        setScore(sessionStorage.getItem('score'))
    }

    useEffect(() => {
        setScore(sessionStorage.getItem('score'))
    }, [])
     
  
  return (
    <>
    {/* <Track record={record} trys={trys} /> */}
    <div className="main">
        {tenzies && <Confetti />}
        <div className="toptext">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <Track score={score} trys={trys} />
        <div className="dieContainer">
            {elements}
        </div>
        <div className="btnContainer">
            {!tenzies ? <button className="btnRoll" onClick={roll}>Roll</button> : <button className="btnReset" onClick={resetGame}>Reset Game</button>}
        </div>
    </div>
    </>
  )
}

export default Roll

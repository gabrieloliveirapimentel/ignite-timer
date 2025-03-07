import { useEffect, useReducer, useState } from 'react'
import { CyclesContext } from './context'
import { differenceInSeconds } from 'date-fns'
import { cyclesReducers } from '../reducers/cycles/reducers'

import { 
    CycleProps, 
    CreateCycleData, 
    CyclesContextProviderProps, 
} from '../@types/types'
import { 
    addNewCycleAction, 
    interruptCurrentCycleAction, 
    markCurrentCycleAsFinishedAction
 } from '../reducers/cycles/actions'



export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducers, 
        { 
            cycles: [], 
            activeCycleId: null 
        }, (initialState) => {
            const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON)
            }

            return initialState
        })

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        
        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }
    
    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: CycleProps = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    return (
        <CyclesContext.Provider
            value={{ 
            cycles,
            activeCycle, 
            activeCycleId,
            amountSecondsPassed,
            setSecondsPassed, 
            createNewCycle, 
            interruptCurrentCycle,
            markCurrentCycleAsFinished 
            }}
        > {children}
        </CyclesContext.Provider>
    )
}
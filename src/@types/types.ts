import { ReactNode } from "react"

export interface CycleProps {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

export interface CyclesStateProps {
    cycles: CycleProps[]
    activeCycleId: string | null
}

export interface CreateCycleData {
    task: string
    minutesAmount: number
}

export interface CyclesContextType {
    cycles: CycleProps[]
    activeCycle: CycleProps | undefined
    activeCycleId: string | null
    amountSecondsPassed: number

    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

export interface CyclesContextProviderProps { 
    children: ReactNode 
}

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}
export interface ActionProps {
    type: ActionTypes
    payload?:  {
        newCycle?: CycleProps
    }
}

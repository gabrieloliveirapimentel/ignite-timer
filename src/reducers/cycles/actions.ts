import { ActionTypes, CycleProps } from "../../@types/types";

export function addNewCycleAction(newCycle: CycleProps) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: { newCycle }
    }
}

export function markCurrentCycleAsFinishedAction() {
    return { type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED }
}

export function interruptCurrentCycleAction() {
    return { type: ActionTypes.INTERRUPT_CURRENT_CYCLE }
}
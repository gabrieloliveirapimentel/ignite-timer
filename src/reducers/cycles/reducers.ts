import { produce } from "immer"
import { ActionProps, ActionTypes, CyclesStateProps } from "../../@types/types"

export function cyclesReducers (state: CyclesStateProps, action: ActionProps) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return produce(state, draft => {
                if (action.payload && action.payload.newCycle) {
                    draft.cycles.push(action.payload.newCycle)
                    draft.activeCycleId = action.payload.newCycle.id
                }
            })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex((cycle) => cycle.id === state.activeCycleId)
            
            if (currentCycleIndex < 0) {
                return state
            }

            return produce(state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interruptedDate = new Date()
            })
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
            const currentCycleIndex = state.cycles.findIndex((cycle) => cycle.id === state.activeCycleId)
            
            if (currentCycleIndex < 0) {
                return state
            }

            return produce(state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finishedDate = new Date()
            })
        }
        default:
            return state
    }
}
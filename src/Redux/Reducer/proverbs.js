import * as types from "../Actions/actionTypes";
const initialState = {
  proverbs: null,
  activeProverb: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_PROVERBS:
      return {
        ...state,
        proverbs: payload.data,
        loading: false,
      };

      case types.CREATE_PROVERB:
      return {
        ...state,
        proverbs: [payload,...state.proverbs],
        loading: false,
      };

      case types.EDIT_PROVERB:
        const updatedProverbs = (data) => {
          const clonedProverb = {...state.activeProverb}
          const newProverb = {...clonedProverb, content: data.content}
          return newProverb
        }
      return {
        ...state,
        activeProverb: updatedProverbs(payload.data),
        loading: false,
      };

      case types.PUBLISH_PROVERB:
        const updated = (data, id) => {
          const clonedProverb = state.proverbs
          const targetProverb = state.proverbs.find(data=> data.id === id)
          const newProverb = {...targetProverb, publish: data.publish}
          let newIndex = state.proverbs.findIndex(x=> x.id === id)
          clonedProverb[newIndex] = newProverb
          return clonedProverb
        }
      return {
        ...state,
        activeProverb: updated(payload.data, payload.id),
        loading: false,
      };

      case types.DELETE_PROVERB:
      return {
        ...state,
        laoding: false,
        proverbs: state.proverbs.filter(proverb=> proverb.id !== payload)

      }

      case types.ACTIVE_PROVERB:
        return {
          ...state,
          activeProverb: payload,
          loading: false,
        };

      case types.CREATE_TRANSLATION:
        state.activeProverb.translation.push(payload)
        return {
          ...state,
          activeProverb:{...state.activeProverb } ,
          loading: false,
        };

        case types.UPDATE_TRANSLATION:
          let cloneActive = state.activeProverb
          let newActiveproverb = () => {
            let newIndex = cloneActive.translation.findIndex(x=> x.id === payload.updateId)
            const clonedUpdate = cloneActive.translation.find(data=> data.id === payload.updateId)
            let newUpdate = {...clonedUpdate, ...payload.data}
            cloneActive.translation[newIndex] = newUpdate
            
            return cloneActive
          }
         return {
          ...state,
          activeProverb: newActiveproverb() ,
          loading: false,
        };

        case types.UPDATE_INTERPRETATION:
          const cloneState = state.activeProverb
          const newActiveProverb = () => {
            let newIndex = cloneState.interpretation.findIndex(x=> x.id === payload.updateId)
            const clonedUpdate = cloneState.interpretation.find(data=> data.id === payload.updateId)
            let newUpdate = {...clonedUpdate, ...payload.data}
            cloneState.interpretation[newIndex] = newUpdate
            
            return cloneState
          }
         return {
          ...state,
          activeProverb: newActiveProverb() ,
          loading: false,
        };

        case types.CREATE_INTERPRETATION:
        state.activeProverb.interpretation.push(payload)
        return {
          ...state,
          activeProverb:{...state.activeProverb } ,
          loading: false,
        };
      
        case types.DELETE_TRANSLATION:
          let clonedTranslation = [...state.activeProverb.translation]
        const updateTranslation = clonedTranslation.filter(data=> data.id !== payload)
        return {
          ...state,
          activeProverb:{...state.activeProverb, translation: updateTranslation } ,
          loading: false,
        };

        case types.DELETE_INTERPRETATION:
          let clonedInterpratation = [...state.activeProverb.interpretation]
        const updateInterpretation = clonedInterpratation.filter(data=> data.id !== payload)
        return {
          ...state,
          activeProverb:{...state.activeProverb, interpretation: updateInterpretation } ,
          loading: false,
        };
    default:
      return state;
  }
}

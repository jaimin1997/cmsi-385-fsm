export default class DeterministicFiniteStateMachine {

  /**
   */
  constructor({ transitions, startState, acceptStates }) {
    this.transitions = transitions;
    this.startState = startState;
    this.acceptStates = acceptStates;
  }

  alphabet() {
    const alphabet = new Set();
    
    for(const [state, desc] of Object.entries(this.transitions)) {
      for(const symbol of Object.keys(desc)) {
        alphabet.add(symbol);
      }
    }

    return alphabet.values();
  }

  states() {
    return new Set(Object.keys(this.transitions));
  }

  stateAccepted(state) {
    return this.acceptStates.includes(state);
  }

  /**
   *
   * @returns a string state name
   */
  transition(state, symbol) {
    if(!this.transitions[state]) return;
    return this.transitions[state][symbol];
  }

  accepts(string, state = this.startState) {
    const nextState = this.transition(state, string.charAt(0));
    return (string.length === 0) ? this.stateAccepted(state) :
                                   this.accepts(string.substr(1), nextState);
  }

}

/**
 *
 */
export function cross(dfa1, dfa2, accepts = (dfa1State, dfa2State) => true) {
  const acceptStates = [];
  const transitions = {};
  const alphabet = new Set([...dfa1.alphabet(), ...dfa2.alphabet()]);

  const newState = (state1, state2) => {
    const stateName = `m1:${state1}xm2:${state2}`;
    if(!transitions[stateName]) {
      if(accepts(state1, state2)) acceptStates.push(stateName);
      transitions[stateName] = {};
    }
    
    return stateName;
  };

  const startState = newState(dfa1.startState, dfa2.startState);

  for(const state1 of dfa1.states()) {
    for(const state2 of dfa2.states()) {
      const newStateName = newState(state1, state2);
      transitions[newStateName] = {};
      for(const symbol of alphabet) {
        const nextState1 = dfa1.transition(state1, symbol);
        const nextState2 = dfa2.transition(state2, symbol);

        const nextStateName = newState(nextState1, nextState2);
        transitions[newStateName][symbol] = nextStateName;
      }
    }
  }

  return new DeterministicFiniteStateMachine({
    acceptStates,
    startState,
    transitions
  });
}

export function union(dfa1, dfa2) {
  return cross(dfa1, dfa2, 
    (state1, state2) => dfa1.stateAccepted(state1) || dfa2.stateAccepted(state2));
}

export function intersection(dfa1, dfa2) {
  return cross(dfa1, dfa2, 
    (state1, state2) => dfa1.stateAccepted(state1) && dfa2.stateAccepted(state2));
}

export function minus(dfa1, dfa2) {
  return cross(dfa1, dfa2, 
    (state1, state2) => dfa1.stateAccepted(state1) && !dfa2.stateAccepted(state2));
}

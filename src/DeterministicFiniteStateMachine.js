export default class DeterministicFiniteStateMachine {

  /**
   */
  constructor({ transitions, startState, acceptStates }) {
    this.transitions = transitions;
    this.startState = startState;
    this.acceptStates = acceptStates;
  }

  /**
   *
   * @returns a string state name
   */
  transition(state, symbol) {
    return this.transitions[state][symbol];
  }

  isAcceptState(state) {
    return this.acceptStates.includes(state);
  }

  accepts(string, state = this.startState) {
    const nextState = this.transition(state, string.charAt(0));

    return (string.length === 0) ? this.isAcceptState(state) :
                                   this.accepts(string.substr(1), nextState);
  }

/*
  accepts(string, state = this.startState) {
    let currentString = string;
    let currentState = state;

    while(currentString.length > 0) {
      currentState = this.transition(currentState, currentString.charAt(0));
      currentString = currentString.substr(1);
    }

    return this.isAcceptState(currentState);
  }
*/

}

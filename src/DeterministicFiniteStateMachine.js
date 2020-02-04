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

  accepts(string, state = this._startState) {
    throw 'IMPLEMENT FiniteStateMachine.accepts';
  }

}

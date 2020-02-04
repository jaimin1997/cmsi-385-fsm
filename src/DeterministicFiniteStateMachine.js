export default class DeterministicFiniteStateMachine {

  /**
   */
  constructor({ transitions, startState, acceptStates }) {
    throw 'IMPLEMENT constructor(description)';
  }

  /**
   *
   * @returns a string state name
   */
  transition(state, symbol) {
    throw 'IMPLEMENT transition(state, symbol)';
  }

  accepts(string, state = this._startState) {
    throw 'IMPLEMENT FiniteStateMachine.accepts';
  }

}

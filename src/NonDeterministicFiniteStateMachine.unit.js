import NonDeterministicFiniteStateMachine, { LAMBDA } from './DeterministicFiniteStateMachine';

const tests = {
  divisibleBy4: {
    description: {
      transitions: {
        start: {
          [LAMBDA]: ['div4'],
          0: ['start', 'div2'],
          1: ['start'],
        },
        div2: {
          0: ['div4'],
        },
      },
      startState: 'start',
      acceptStates: ['div4'],
    },

    tests: {
      accepts: [
        '0100',
        '01000',
        '0100',
        '0',
        '',
      ],
      rejects: [
        '10',
        '11',
        '1001011'
      ],
    }
  },
  divisibleBy4InfiniteLambda: {
    description: {
      transitions: {
        start: {
          [LAMBDA]: ['div4'],
          0: ['start', 'div2'],
          1: ['start'],
        },
        div2: {
          [LAMBDA]: ['start'],
          0: ['div4'],
        },
      },
      startState: 'start',
      acceptStates: ['div4'],
    },

    tests: {
      accepts: [
        '0100',
        '01000',
        '0100',
        '0',
        '',
      ],
      rejects: [
        '10',
        '11',
        '1001011'
      ],
    }
  },
};

describe('examples', () => {
  for (const [key, desc] of Object.entries(tests)) {
    describe(key, () => {
      test('transition', () => {
        const { description } = desc;

        const fsm = new NonDeterministicFiniteStateMachine(description);
        for (const [state, stateTransitions] of Object.entries(description.transitions)) {
          for (const [symbol, nextState] of Object.entries(stateTransitions)) {
            expect(fsm.transition(state, symbol)).toEqual(nextState);
          }
        }
      });
      test('accepts / rejects', () => {
        const { description, tests: { accepts, rejects } } = desc;
        const fsm = new NonDeterministicFiniteStateMachine(description);

        for (const string of accepts) {
          expect(`${string}: true`).toEqual(`${string}: ${fsm.accepts(string)}`);
        }

        for (const string of rejects) {
          expect(`${string}: false`).toEqual(`${string}: ${fsm.accepts(string)}`);
        }
      });
    });
  }
});


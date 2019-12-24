import { adder } from '../State/slices'

describe('adder reducer', () => {
  it('should add one to the state', () => {
    expect(adder.reducer(undefined, {type: adder.actions.increment})).toEqual(1)
  })

  it('should return the initial state', () => {
    expect(adder.reducer(1, {type: adder.actions.increment})).toEqual(2)
  })
})
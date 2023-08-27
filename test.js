/**
 * @typedef {import('ava/types/test-fn.cjs')} Test
 */

import test from 'ava'
import { Timer } from './index.js'

/**
 * @param {Test} t
 */
test('Throws error if elapsedTime is called before start', (t) => {
  const timer = new Timer()

  /**
   * @type {Error}
   */
  let error

  try {
    timer.elapsedTime()
  } catch (e) {
    if (e instanceof Error) {
      error = e
      t.truthy(error)
      t.is(error.message, 'Timer has not been properly started.')
    }
  }
})

/**
 * @param {Test} t
 */
test('Throws error if stop is called before start', (t) => {
  const timer = new Timer()

  /**
   * @type {Error}
   */
  let error

  try {
    timer.stop()
  } catch (e) {
    if (e instanceof Error) {
      error = e
      t.truthy(error)
      t.is(error.message, 'Timer has not been started yet.')
    }
  }
})

/**
 * @param {Test} t
 */
test('Throws error if start is called again after start', (t) => {
  const timer = new Timer()

  /**
   * @type {Error}
   */
  let error

  timer.start()
  try {
    timer.start()
  } catch (e) {
    if (e instanceof Error) {
      error = e
      t.truthy(error)
      t.is(error.message, 'Timer has already been started.')
    }
  }
})

/**
 * @param {Test} t
 */
test('Throws error if stop is called again after stop', (t) => {
  const timer = new Timer()

  /**
   * @type {Error}
   */
  let error

  timer.start()
  timer.stop()
  try {
    timer.stop()
  } catch (e) {
    if (e instanceof Error) {
      error = e
      t.truthy(error)
      t.is(error.message, 'Timer has already been stopped yet.')
    }
  }
})

/**
 * @param {Test} t
 */
test('reset sets startTime and endTime back to null', async (t) => {
  const timer = new Timer()
  timer.start()

  // Wait for some time
  await new Promise(resolve => setTimeout(resolve, 500))

  timer.stop()

  // Confirm that elapsed time is not null
  let elapsed = timer.elapsedTime()
  t.true(elapsed >= 500)

  timer.reset() // The timer is now reset

  // Attempting to get the elapsed time now should throw an error.
  /**
   * @type {Error}
   */
  let error
  try {
    elapsed = timer.elapsedTime()
  } catch (e) {
    if (e instanceof Error) {
      error = e
      t.truthy(error)
      t.is(error.message, 'Timer has not been properly started.')
    }
  }

  // Attempting to stop the timer again should also throw an error.
  try {
    timer.stop()
  } catch (e) {
    if (e instanceof Error) {
      error = e
      t.truthy(error)
      t.is(error.message, 'Timer has not been started yet.')
    }
  }
})

/**
 * @param {Test} t
 */
test('Does not throw error on call of elapsedTime after start and stop', (t) => {
  const timer = new Timer()
  timer.start()
  timer.stop()
  const elapsed = timer.elapsedTime()
  t.true(elapsed >= 0)
})

/**
 * @param {Test} t
 */
test('elapsedTime returns the correct elapsed time', async (t) => {
  const timer = new Timer()
  timer.start()

  // Wait for 500 milliseconds
  await new Promise(resolve => setTimeout(resolve, 500))

  timer.stop()

  // Get the elapsed time. Due to the nature of setTimeout and the timer resolution,
  // the actual elapsed time might be slightly more than 500 milliseconds. So check if it's
  // within an acceptable range.
  const elapsed = timer.elapsedTime()

  t.true(elapsed >= 500 && elapsed < 510) // Assuming a 10 millisecond tolerance
})

/**
 * @param {Test} t
 */
test('elapsedTime should be able to keep reporting before stopping', async (t) => {
  const timer = new Timer()
  timer.start()

  // Wait for 500 milliseconds
  await new Promise(resolve => setTimeout(resolve, 500))

  // Get the elapsed time. Due to the nature of setTimeout and the timer resolution,
  // the actual elapsed time might be slightly more than 500 milliseconds. So check if it's
  // within an acceptable range.
  const elapsed1 = timer.elapsedTime()

  t.true(elapsed1 >= 500 && elapsed1 < 510) // Assuming a 10 millisecond tolerance

  // Wait for 500 more milliseconds
  await new Promise(resolve => setTimeout(resolve, 500))

  timer.stop()

  const elapsed2 = timer.elapsedTime()

  t.true(elapsed2 >= 1000 && elapsed2 < 1010) // Assuming a 10 millisecond tolerance

  const elapsed3 = timer.elapsedTime()
  t.deepEqual(elapsed2, elapsed3)
})

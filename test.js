import test from 'ava'
import { Timer } from './index.js'

test('Throws error if elapsedTime is called before start', (t) => {
  const timer = new Timer()
  let error
  try {
    timer.elapsedTime()
  } catch (e) {
    error = e
  }
  t.truthy(error)
  t.is(error.message, 'Timer has not been properly started or stopped.')
})

test('Throws error if stop is called before start', (t) => {
  const timer = new Timer()
  let error
  try {
    timer.stop()
  } catch (e) {
    error = e
  }
  t.truthy(error)
  t.is(error.message, 'Timer has not been started yet.')
})

test('Throws error if start is called again after start', (t) => {
  const timer = new Timer()
  let error
  timer.start()
  try {
    timer.start()
  } catch (e) {
    error = e
  }
  t.truthy(error)
  t.is(error.message, 'Timer has already been started.')
})

test('Throws error if stop is called again after stop', (t) => {
  const timer = new Timer()
  let error
  timer.start()
  timer.stop()
  try {
    timer.stop()
  } catch (e) {
    error = e
  }
  t.truthy(error)
  t.is(error.message, 'Timer has already been stopped yet.')
})

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
  let error
  try {
    elapsed = timer.elapsedTime()
  } catch (e) {
    error = e
  }
  t.truthy(error)
  t.is(error.message, 'Timer has not been properly started or stopped.')

  // Attempting to stop the timer again should also throw an error.
  try {
    timer.stop()
  } catch (e) {
    error = e
  }
  t.truthy(error)
  t.is(error.message, 'Timer has not been started yet.')
})

test('Does not throw error on call of elapsedTime after start and stop', (t) => {
  const timer = new Timer()
  timer.start()
  timer.stop()
  const elapsed = timer.elapsedTime()
  t.true(elapsed >= 0)
})

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

  t.true(elapsed >= 500)
  t.true(elapsed < 510) // Assuming a 10 millisecond tolerance
})

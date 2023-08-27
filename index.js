/**
 * A Timer class. Allows starting, stopping, and getting
 * the elapsed time between start and stop calls.
 */
export class Timer {
  /**
   * Creates a new Timer object.
   */
  constructor () {
    /** @type {number|null} */
    this.startTime = null

    /** @type {number|null} */
    this.endTime = null
  }

  /**
   * Starts the timer.
   * @throws {Error} If the timer has already been started.
   * @returns {Timer} The current timer instance.
   */
  start () {
    if (this.startTime !== null) {
      throw new Error('Timer has already been started.')
    }
    this.startTime = performance.now()
    return this
  }

  /**
   * Stops the timer.
   * @throws {Error} If the timer has not been started yet or has already been stopped.
   * @returns {Timer} The current timer instance.
   */
  stop () {
    if (this.startTime === null) {
      throw new Error('Timer has not been started yet.')
    }
    if (this.endTime !== null) {
      throw new Error('Timer has already been stopped yet.')
    }
    this.endTime = performance.now()
    return this
  }

  /**
   * Resets the timer.
   * @returns {Timer} The current timer instance.
   */
  reset () {
    this.startTime = null
    this.endTime = null
    return this
  }

  /**
   * Calculates and gets the elapsed time.
   * @throws {Error} If the timer has not been properly started.
   * @returns {number} The elapsed time in milliseconds.
   */
  elapsedTime () {
    if (this.startTime === null) {
      throw new Error('Timer has not been properly started.')
    }
    return (this.endTime || performance.now()) - this.startTime
  }
}

# jiffy-timer

`jiffy-timer` is a high-precision JavaScript timer which allows you to easily measure elapsed time in your applications. 

Whether tracking performance, benchmarking functions, or creating a stopwatch, `jiffy-timer` gives you an easy to use API for time measurements.

## Installation

You can install `jiffy-timer` with npm:

```bash
npm install @amscotti/jiffy-timer
```

## Usage

Here's an example of how to use `jiffy-timer`:

```javascript
// Import Timer class
import { Timer } from '@amscotti/jiffy-timer'

// Create a new timer instance
const timer = new Timer()

// Start the timer
timer.start()

// Do some operations... 

// Stop the timer
timer.stop()

// Get the elapsed time in milliseconds 
const elapsed = timer.elapsedTime()
console.log(elapsed)
```

You can also do the same with the fluent API, 

```javascript
// Import Timer class
import { Timer } from '@amscotti/jiffy-timer'

// Create a new timer instance and start the timer
const timer = new Timer().start()

// Do some operations... 

// Stop the timer and get the elapsed time in milliseconds 
const elapsed = timer.stop().elapsedTime()
console.log(elapsed)
```

## API

### `start()`

Starts the timer. If the timer has already been started, it throws an error.

Usage:
```javascript
timer.start()
```

### `stop()`

Stops the timer. If the timer has not been started or has already been stopped, it throws an error.

Usage:
```javascript
timer.stop()
```

### `reset()`

Resets the timer.

Usage:
```javascript
timer.reset()
```


### `elapsedTime()`

Returns the elapsed time in milliseconds between start and stop calls. If not stopped, return the elapsed time for the current time. If the timer has not been started, it throws an error.

Usage:
```javascript
const elapsed = timer.elapsedTime()
```

## Testing

Tests have been written using AVA and can be run using npm:

```bash
npm run test
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome! Please read the contributing guide for details.

## Problems or Questions

If you encounter any problems or have any questions, please open an issue.

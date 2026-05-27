Problem Statement
In modern web applications, performance optimization is critical, especially when dealing with high-frequency events like typing, scrolling, or resizing. One common technique used to optimize such scenarios is debouncing.

Debouncing ensures that a function is only executed after a specified delay has passed since the last time it was invoked. This helps reduce unnecessary function calls and improves performance.

Your task is to implement a debounce function that takes a callback function and a delay time, and returns a new debounced version of that function.

Function Signature
function debounce(fn, delay) {
// your implementation
}
Arguments
fn (Function): The function to debounce
delay (number): The delay in milliseconds (or abstract time units for testing)
Returns
(Function): A debounced version of the input function
Requirements
The debounced function should delay invoking fn until after delay time has passed since the last invocation.
If the debounced function is called multiple times within the delay period, only the last call should be executed.
The original function func should be invoked with the correct this context and arguments.
Only one execution should occur after rapid consecutive calls.
Example
Input
const callback = () => console.log("Executed");

const debouncedFn = debounce(callback, 3);

debouncedFn();
debouncedFn();
debouncedFn();
debouncedFn();
debouncedFn();
Conceptual Timeline
Before debouncing:

─A─B─C─ ─D─ ─ ─ ─ ─ ─E─ ─F─G
After debouncing (delay = 3):

─ ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ ─ ─ G
Expected Behavior
The function should be executed only once after the burst of rapid calls.

Create a custom hook called useTimer that provides the following API

const TOTAL_TIME = 5;
const { isRunning, start, stop, seconds } = useTimer(TOTAL_TIME);
Show two buttons on the screen start & stop.
One button to start the timer. When the timer is running then show remaining seconds on the screen.
Another button to stop the timer. When the timer stops/reaches to 0 then it resets to total time and shows “No Timer Running” on the screen.

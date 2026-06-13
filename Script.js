let warningCount = 0;
let tabSwitchCount = 0;
let fullscreenExitCount = 0;

// Elements
const logsDiv = document.getElementById("logs");
const warningDiv = document.getElementById("warningCount");
const statusDiv = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const tabCountDiv = document.getElementById("tabCount");
const fullscreenCountDiv = document.getElementById("fullscreenCount");
const timerDiv = document.getElementById("timer");

// Add log entry
function addLog(message) {

    const time = new Date().toLocaleTimeString();

    const log = document.createElement("p");
    log.innerText = `${time} - ${message}`;

    logsDiv.appendChild(log);

    // Auto scroll
    logsDiv.scrollTop = logsDiv.scrollHeight;

    console.log({
        event: message,
        timestamp: new Date().toISOString()
    });
}

// Warning handler
function issueWarning(reason) {

    warningCount++;

    warningDiv.innerText = warningCount;

    addLog(reason);

    if (warningCount >= 3) {

        statusDiv.innerText = "TEST TERMINATED";

        alert("Test Terminated");

        return;
    }

    alert(`Warning ${warningCount}/3\n${reason}`);
}

// Timer
function startTimer(duration) {

    let time = duration;

    const countdown = setInterval(() => {

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        timerDiv.innerText =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        time--;

        if (time < 0) {

            clearInterval(countdown);

            statusDiv.innerText = "EXAM FINISHED";

            addLog("Timer Expired");

            alert("Time Over!");
        }

    }, 1000);
}

// Start Test
function startTest() {

    statusDiv.innerText = "Active";

    addLog("Test Started");

    // 30 minutes timer
    startTimer(30 * 60);

    // Enter fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
}

startBtn.addEventListener("click", startTest);

// Detect tab switch
document.addEventListener("visibilitychange", function () {

    if (document.hidden) {

        tabSwitchCount++;

        tabCountDiv.innerText = tabSwitchCount;

        issueWarning("Tab Switched");
    }
});

// Detect focus loss
window.addEventListener("blur", function () {

    addLog("Window Lost Focus");
});

// Detect focus return
window.addEventListener("focus", function () {

    addLog("Window Focus Returned");
});

// Detect fullscreen exit
document.addEventListener("fullscreenchange", function () {

    if (!document.fullscreenElement &&
        statusDiv.innerText === "Active") {

        fullscreenExitCount++;

        fullscreenCountDiv.innerText =
            fullscreenExitCount;

        issueWarning("Exited Fullscreen");
    }
});
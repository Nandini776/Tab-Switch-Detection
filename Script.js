let warnCount=0;
let tabSwitchCount=0;
let fullscreenExitCount=0;

// Add activity to log
function addLog(message){
    let currentTime=new Date().toLocaleTimeString();
    logs.innerHTML+=`<p>${currentTime} - ${message}</p>`;
}

// Show warning
function showWarning(reason){
    warnCount++;
    warningCount.innerText=warnCount;
    addLog(reason);

    if(warnCount>=3){
        status.innerText="TERMINATED";
        alert("Test Terminated");
        return;
    }

    alert("Warning "+warnCount+"/3");
}

// Start exam
function startExam(){
    status.innerText="Active";
    let timeLeft=3600;

    setInterval(function(){
        let minutes=Math.floor(timeLeft/60);
        let seconds=timeLeft%60;
        timer.innerText=minutes+":"+seconds;
        timeLeft--;
    },1000);

    document.documentElement.requestFullscreen();
}

startBtn.onclick=startExam;

// Check tab change
document.addEventListener("visibilitychange",function(){
    if(document.hidden){
        tabSwitchCount++;
        tabCount.innerText=tabSwitchCount;
        showWarning("Tab Switched");
    }
});

// Check fullscreen exit
document.addEventListener("fullscreenchange",function(){
    if(!document.fullscreenElement){
        fullscreenExitCount++;
        fullCount.innerText=fullscreenExitCount;
        showWarning("Exited Fullscreen");
    }
});
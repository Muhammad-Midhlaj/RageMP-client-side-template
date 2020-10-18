var jobselectorOpened = false;

mp.events.add("showJobMenu", (level, currentjob) => {
    mp.gui.cursor.visible = true;
    jobselectorOpened = true;

    mp.gui.emmit(
        `window.modal.updateModalMenu("jobselector"),` +
        `window.jobselector.setData(${level},${currentjob});`
    );
});

mp.events.add("closeJobMenu", () => {
    mp.gui.cursor.visible = false;
    jobselectorOpened = false;
    mp.gui.emmit(`window.modal.updateModalMenu("")`);
});

mp.keys.bind(global.Keys.VK_ESCAPE, false, function() {
    if(jobselectorOpened) {
        mp.gui.cursor.visible = false;
        jobselectorOpened = false;
        mp.gui.emmit(`window.modal.updateModalMenu("")`);
    }
});

mp.events.add("selectJob", (jobid) => {
	if (new Date().getTime() - global.lastCheck < 1000) return;
	global.lastCheck = new Date().getTime();
    mp.events.callRemote("jobjoin", jobid);
});
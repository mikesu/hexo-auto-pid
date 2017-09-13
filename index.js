var fs = require('fs');

function readPid(callback) {
	var pidFile = process.cwd()+"/pid";
	var pid = 1;
	if (!fs.existsSync(pidFile)) {
		fs.writeFile(pidFile, pid, (err) => {
			if (err) throw err;
			callback(pid);
		});
	}else{
		fs.readFile(pidFile, (err, data) => {
	  		if (err) throw err;
	  		pid = parseInt(data) + 1;
			fs.writeFile(pidFile, pid, (err) => {
				if (err) throw err;
				callback(pid);
			});
		});
	}
}

hexo.extend.console.register('create', 'auto gen pid', function(args){
	var self = this;
	readPid((pid) => {
		args["pid"] = pid;
		self.call('new', args)
	});
});
var log = require('./log');

/**
 * base class for commands
 */
function Command(name, desc, options, func, prep_func) {
	this.description = desc;
	this.command = func;
	this.name = name;
	this.options = options;
	this.prep_func = prep_func;
}

Command.prototype.getOptions = function() {
	return this.options;
};

Command.prototype.getName = function() {
	return this.name;
};

Command.prototype.getHelp = function() {
	return this.description;
};

Command.prototype.execute = function(state, done) {
	if (this.prep_func) {
		var self = this;
		this.prep_func(state, function(err){
			if (err) { return done(err); }
			return self.command(state, done);
		});
		return;
	}
	return this.command(state, done);
};

/**
 * log how long a particular command took to run
 */
Command.prototype.finishedCommand = function(command) {
	log.trace(command.yellow + ' finished in ' + String((Date.now() - this.executionStartedAt) / 1000).yellow + ' seconds.\n\n');
};

module.exports = Command;
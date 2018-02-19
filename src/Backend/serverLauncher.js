//process.env['DEBUG'] = '*';

alias = require("module-alias");
alias.addPath(__dirname + "/../");

require("./server");

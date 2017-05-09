console.log('indexjs');
var express   = require('express'),
    bp        = require('body-parser'),
    cp        = require('cookie-parser'),
    path      = require('path'),
    root      = __dirname,
    port      = process.env.PORT || 8000,
    app       = express();
app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cp());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function(){
  console.log(`meantemplateypc server running on port ${ port }`);
})
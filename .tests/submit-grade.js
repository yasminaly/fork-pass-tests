var
  readPkg = require('read-pkg'),
  gitExecute = require('git-execute'),
  path = require('path'),
  https = require('https'),
  repoPath = path.resolve(process.env.REPO || ('./.git'))
;

if (!process.env.TRAVIS_PULL_REQUEST) return;

// process.env.TRAVIS_COMMIT;
// process.env.TRAVIS_REPO_SLUG;

gitExecute(repoPath, ['rev-parse', '--abbrev-ref', 'HEAD'], function(err, stdout, stderr) {
  var
    ghUsername = stdout.trim().replace(/-gh-pages/, ''),
    proxyUrl = 'https://travis-canvas-proxy.appspot.com/grade?%s'
  ;

  readPkg().then(function (pkg) {
    var getVars = [
      util.format('gh_user=%s', encodeURI(ghUsername)),
      util.format('gh_repo=%s', encodeURI(process.env.TRAVIS_REPO_SLUG)),
      util.format('gh_pr=%s', process.env.TRAVIS_PULL_REQUEST),
      util.format('canvas_course=%s', pkg['canvas-course']),
      util.format('canvas_assignment=%s', pkg.name)
    ];

    https.get(util.format(proxyUrl, getVars.join('&'), function (res) {});
  });

  console.log(ghUsername);
});

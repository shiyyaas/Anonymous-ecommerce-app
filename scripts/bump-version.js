const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getLatestTag() {
  try {
    const tag = execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim();
    return tag;
  } catch (e) {
    return null;
  }
}

function parseSemVer(tag) {
  if (!tag) return { major: 1, minor: 0, patch: 0 };
  const clean = tag.replace(/^v/, '');
  const parts = clean.split('.').map(n => parseInt(n, 10));
  return {
    major: isNaN(parts[0]) ? 1 : parts[0],
    minor: isNaN(parts[1]) ? 0 : parts[1],
    patch: isNaN(parts[2]) ? 0 : parts[2],
  };
}

function determineBump() {
  let commits = '';
  try {
    const latestTag = getLatestTag();
    const range = latestTag ? `${latestTag}..HEAD` : 'HEAD';
    commits = execSync(`git log ${range} --pretty=format:"%s"`, { encoding: 'utf-8' });
  } catch (e) {
    try {
      commits = execSync('git log -n 10 --pretty=format:"%s"', { encoding: 'utf-8' });
    } catch (err) {
      commits = '';
    }
  }

  const lines = commits.split('\n').filter(Boolean);
  let bump = 'patch';

  for (const line of lines) {
    if (line.includes('BREAKING CHANGE') || /^[a-z]+(\([a-z0-9_-]+\))?!:/.test(line)) {
      return 'major';
    }
    if (/^feat(\([a-z0-9_-]+\))?:/.test(line)) {
      bump = 'minor';
    }
  }

  return bump;
}

function run() {
  const latestTag = getLatestTag();
  const current = parseSemVer(latestTag);
  const bump = determineBump();

  let next = { ...current };
  if (!latestTag) {
    next = { major: 1, minor: 0, patch: 0 };
  } else if (bump === 'major') {
    next.major += 1;
    next.minor = 0;
    next.patch = 0;
  } else if (bump === 'minor') {
    next.minor += 1;
    next.patch = 0;
  } else {
    next.patch += 1;
  }

  const nextVersion = `${next.major}.${next.minor}.${next.patch}`;
  const nextTag = `v${nextVersion}`;

  console.log(`Current version: ${latestTag || 'None'}`);
  console.log(`Bump type: ${bump}`);
  console.log(`Next version: ${nextVersion} (${nextTag})`);

  // Update app.json
  const appJsonPath = path.resolve(__dirname, '../app.json');
  if (fs.existsSync(appJsonPath)) {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    if (appJson.expo) {
      appJson.expo.version = nextVersion;
      fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
      console.log(`Updated app.json expo.version to ${nextVersion}`);
    }
  }

  // Update package.json
  const pkgPath = path.resolve(__dirname, '../package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.version = nextVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`Updated package.json version to ${nextVersion}`);
  }

  // Set GitHub Action output if in GHA
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${nextVersion}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `tag=${nextTag}\n`);
  }
}

run();

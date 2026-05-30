const fs = require('fs');
const path = require('path');
const https = require('https');

const icons = {
  kubernetes: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/kubernetes.svg',
  jenkins: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/jenkins.svg',
  terraform: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/terraform.svg',
  docker: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/docker.svg',
  aws: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonwebservices.svg',
  python: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/python.svg',
  java: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openjdk.svg', // Simple Icons uses openjdk or oracle? Let's check oracle/openjdk/java
  argocd: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/argo.svg',
  helm: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/helm.svg',
  githubactions: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/githubactions.svg',
  linux: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/linux.svg',
  git: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/git.svg'
};

const output = {};

function fetchIcon(name, url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to fetch ${name}: ${res.statusCode}`);
        // Try fallback if openjdk/java has issues
        if (name === 'java') {
          console.log('Retrying java with oracle...');
          fetchIcon('java', 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/oracle.svg').then(resolve);
          return;
        }
        resolve();
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Extract paths using regex
        const pathMatches = [...data.matchAll(/<path d="([^"]+)"/g)].map(m => m[1]);
        if (pathMatches.length > 0) {
          output[name] = pathMatches;
          console.log(`Successfully fetched ${name} (${pathMatches.length} paths)`);
        } else {
          console.error(`No path found in SVG for ${name}`);
        }
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error fetching ${name}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  const promises = Object.entries(icons).map(([name, url]) => fetchIcon(name, url));
  await Promise.all(promises);

  const outputPath = path.join(__dirname, 'skills-svgs.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Saved output to ${outputPath}`);
}

run();

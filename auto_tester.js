const { spawnSync } = require('child_process');

let targetSuccesses = 10;
let currentSuccesses = 0;
let attempt = 1;

while (currentSuccesses < targetSuccesses) {
    console.log(`\n========================================================`);
    console.log(`⏳ STARTING ATTEMPT #${attempt} (Success count: ${currentSuccesses}/${targetSuccesses})`);
    console.log(`========================================================`);
    
    // Run the nexus sandbox command
    const result = spawnSync('node', ['cli.js', 'sandbox'], { stdio: 'inherit' });
    
    if (result.error) {
        console.log(`\n❌ Attempt #${attempt} FAILED to start: ${result.error.message}`);
        console.log(`⚠️ Resetting success count from ${currentSuccesses} to 0...`);
        currentSuccesses = 0;
    } else if (result.status === 0) {
        console.log(`\n✅ Attempt #${attempt} SUCCEEDED!`);
        currentSuccesses++;
    } else {
        console.log(`\n❌ Attempt #${attempt} FAILED with exit code: ${result.status}`);
        console.log(`⚠️ Resetting success count from ${currentSuccesses} to 0 as requested...`);
        currentSuccesses = 0;
    }
    
    attempt++;
}

console.log(`\n🎉 COMPLETELY SUCCESSFUL 10 TIMES IN A ROW!`);

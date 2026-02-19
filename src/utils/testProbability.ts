import { selectPrize } from './probability';
import { WHEEL_PRIZES } from '../data/prizes';

/**
 * Test the probability distribution by simulating multiple spins
 * Run this in the browser console: testProbabilityDistribution(200)
 */
export function testProbabilityDistribution(numberOfSpins: number = 200): void {
  console.log(`\n🎰 Testing ${numberOfSpins} spins...`);
  console.log('─'.repeat(60));
  
  // Count prizes
  const results: Record<string, number> = {};
  WHEEL_PRIZES.forEach(prize => {
    results[prize.id] = 0;
  });
  
  // Simulate spins
  for (let i = 0; i < numberOfSpins; i++) {
    const prize = selectPrize(WHEEL_PRIZES);
    results[prize.id]++;
  }
  
  // Display results
  console.log('\n📊 Results:');
  console.log('─'.repeat(60));
  
  WHEEL_PRIZES.forEach(prize => {
    const actual = results[prize.id];
    const actualPercent = (actual / numberOfSpins) * 100;
    const expectedPercent = prize.probability * 100;
    const difference = actualPercent - expectedPercent;
    const symbol = Math.abs(difference) < 3 ? '✓' : '⚠️';
    
    console.log(
      `${symbol} ${prize.icon} ${prize.name.padEnd(25)} | ` +
      `Expected: ${expectedPercent.toFixed(1)}% (${Math.round(numberOfSpins * prize.probability)}) | ` +
      `Actual: ${actualPercent.toFixed(1)}% (${actual}) | ` +
      `Diff: ${difference > 0 ? '+' : ''}${difference.toFixed(1)}%`
    );
  });
  
  console.log('─'.repeat(60));
  
  // Check rare prizes specifically
  const gcashWins = results['gcash-50'];
  const spotifyWins = results['spotify-raffle'];
  
  console.log('\n💎 Rare Prize Check:');
  console.log(`  💵 GCash (1%): ${gcashWins} wins ${gcashWins > 0 ? '✓' : '❌ NONE!'}`);
  console.log(`  🎵 Spotify (2%): ${spotifyWins} wins ${spotifyWins > 0 ? '✓' : '❌ NONE!'}`);
  
  if (gcashWins === 0) {
    console.warn('⚠️ No GCash wins in this test. This is possible but rare (0.99^200 ≈ 13% chance)');
  }
  if (spotifyWins === 0) {
    console.warn('⚠️ No Spotify wins in this test. This is rare (0.98^200 ≈ 1.8% chance)');
  }
  
  console.log('\n');
}

// Make it available in browser console
if (typeof window !== 'undefined') {
  (window as any).testProbability = testProbabilityDistribution;
  console.log('💡 Test available! Run: testProbability(200)');
}

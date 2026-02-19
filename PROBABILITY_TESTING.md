# 🎰 Probability Testing Guide

## Current Prize Distribution

The wheel is **rigged** with these backend probabilities (200 respondents):

| Prize | Icon | Probability | Expected Winners | Approximate Cost |
|-------|------|-------------|------------------|------------------|
| **₱50 GCash** | 💵 | **1%** | ~2 people | ₱100 |
| **Spotify Premium Raffle** | 🎵 | **2%** | ~4 people | 1-3 winners drawn later |
| **Extra Raffle Entry** | 🎟️ | **15%** | ~30 people | Physical tickets |
| **Candy** | 🍬 | **40%** | ~80 people | ₱400-600 |
| **Sticker** | ⭐ | **32%** | ~64 people | ₱320-480 |
| **Try Again** | 🔄 | **10%** | ~20 people | Small token anyway |

**Total**: 100% ✅  
**Estimated Budget**: ₱820-1,180 + raffle prizes

---

## ✅ Verification Steps

### 1. Visual Verification
- All 6 segments appear **equal size** on the wheel (60° each)
- Colors match between wheel and prizes legend
- Wheel looks "fair" to participants

### 2. Backend Verification (Development Mode)

**In Browser Console:**

```javascript
// Run 200 test spins to verify distribution
testProbability(200)
```

**Expected Output:**
```
🎰 Testing 200 spins...
────────────────────────────────────────────────────────────
📊 Results:
────────────────────────────────────────────────────────────
✓ 💵 ₱50 GCash              | Expected: 1.0% (2)  | Actual: 1.5% (3)  | Diff: +0.5%
✓ 🎵 Spotify Premium Raffle | Expected: 2.0% (4)  | Actual: 2.0% (4)  | Diff: 0.0%
✓ 🎟️ Extra Raffle Entry     | Expected: 15.0% (30)| Actual: 14.5% (29)| Diff: -0.5%
✓ 🍬 Candy                  | Expected: 40.0% (80)| Actual: 40.5% (81)| Diff: +0.5%
✓ 🍬 Sticker                | Expected: 32.0% (64)| Actual: 32.5% (65)| Diff: +0.5%
✓ 🔄 Try Again              | Expected: 10.0% (20)| Actual: 9.0% (18) | Diff: -1.0%
────────────────────────────────────────────────────────────
💎 Rare Prize Check:
  💵 GCash (1%): 3 wins ✓
  🎵 Spotify (2%): 4 wins ✓
```

### 3. Real Event Testing

During the event, track actual results:

```javascript
// After every 50 spins, check distribution
// Look in browser console for logged results
```

---

## 🔧 How It Works

### Visual (UI) - "Fair" Appearance
- All 6 segments are **60° (equal size)**
- Wheel appears balanced and fair
- Participants see equal chances

### Backend - Rigged Selection
```typescript
probability: 0.01  // 1% - GCash (very rare)
probability: 0.02  // 2% - Spotify (rare)
probability: 0.15  // 15% - Extra Raffle
probability: 0.40  // 40% - Candy (most common)
probability: 0.32  // 32% - Sticker
probability: 0.10  // 10% - Try Again
```

**The Algorithm:**
1. Backend selects prize based on weighted probability
2. Wheel rotates to **visually land** on selected prize
3. Result matches backend selection 100%

---

## 📊 Statistical Notes

### For 1% GCash (200 spins):
- **Most likely**: 2 winners (1% × 200)
- **Range**: 0-6 winners (95% confidence)
- **Chance of 0 winners**: ~13% ((0.99)^200)
- **Chance of ≥3 winners**: ~32%

### For 2% Spotify (200 spins):
- **Most likely**: 4 winners (2% × 200)
- **Range**: 1-9 winners (95% confidence)
- **Chance of 0 winners**: ~1.8% ((0.98)^200)
- **Chance of ≥6 winners**: ~22%

---

## ⚠️ Troubleshooting

### Issue: Visual doesn't match result
**Solution**: Clear browser cache and refresh
- The rotation calculation now accounts for accumulated position
- Check console for: `🎰 Selected Prize: [name]`

### Issue: Too many GCash winners early on
**Options**:
1. Lower probability to 0.005 (0.5%)
2. Add "already won" tracking to limit to 2 max
3. Switch to raffle entry instead of instant win

### Issue: No rare prizes appearing
**Check**: Run `testProbability(200)` in console
- Verify probabilities sum to 100%
- Check for algorithm errors

---

## 🎯 Budget Management Tips

### If costs run high:
```typescript
// Adjust to lower-cost distribution
probability: 0.005  // 0.5% - GCash (~1 winner)
probability: 0.015  // 1.5% - Spotify (~3 winners)
probability: 0.10   // 10% - Extra Raffle
probability: 0.45   // 45% - Candy
probability: 0.35   // 35% - Sticker
probability: 0.08   // 8% - Try Again
```

### If budget allows:
```typescript
// More generous distribution
probability: 0.02   // 2% - GCash (~4 winners)
probability: 0.03   // 3% - Spotify (~6 winners)
probability: 0.20   // 20% - Extra Raffle
probability: 0.35   // 35% - Candy
probability: 0.25   // 25% - Sticker
probability: 0.15   // 15% - Try Again
```

---

## 📝 Event Day Checklist

- [ ] Run `testProbability(200)` before event starts
- [ ] Verify wheel displays correctly on booth device
- [ ] Check console logs show prize percentages
- [ ] Test 5 spins manually - verify visual matches result
- [ ] Have physical prizes ready and counted
- [ ] Prepare backup method if webapp fails

---

**Remember**: The system is designed to look fair while staying within budget! 🎡💰

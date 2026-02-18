// Sound Effects Manager
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  preloadSound(name: string, url: string) {
    const audio = new Audio(url);
    audio.preload = 'auto';
    this.sounds.set(name, audio);
  }

  playSound(name: string, volume: number = 0.6) {
    if (!this.enabled) return;
    
    try {
      const audio = this.sounds.get(name);
      if (audio) {
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play().catch(err => console.log('Sound playback failed:', err));
      }
    } catch (error) {
      console.log('Sound error:', error);
    }
  }

  toggleSound(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const soundManager = new SoundManager();

// Haptic Feedback (Mobile)
export function triggerHaptic(pattern: 'success' | 'error' | 'click') {
  if (!navigator.vibrate) return;
  
  const patterns = {
    success: [100, 50, 100],  // Double buzz
    error: [200],             // Long buzz
    click: [10],              // Quick tap
  };
  
  navigator.vibrate(patterns[pattern]);
}

// Analytics tracking
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Google Analytics (if available)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
  
  // Log for debugging
  console.log('Event:', eventName, properties);
}

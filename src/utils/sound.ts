import { AlarmSoundType } from '../types';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play synthesized timer alarm
 */
export function playAlarmSound(type: AlarmSoundType, volumePercent = 80): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const masterVol = Math.max(0, Math.min(1, volumePercent / 100));
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(masterVol, ctx.currentTime);
  masterGain.connect(ctx.destination);

  const now = ctx.currentTime;

  switch (type) {
    case 'chime': {
      // Elegant 4-note ascending chord arpeggio (E5, G#5, B5, E6)
      const freqs = [659.25, 830.61, 987.77, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);

        noteGain.gain.setValueAtTime(0, now + idx * 0.14);
        noteGain.gain.linearRampToValueAtTime(0.4, now + idx * 0.14 + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.14 + 1.6);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 1.7);
      });
      break;
    }

    case 'bell': {
      // Resonant mindfulness bell with rich harmonic overtones
      const partials = [
        { freq: 587.33, gain: 0.5, decay: 2.5 },   // D5
        { freq: 1174.66, gain: 0.25, decay: 2.0 }, // D6
        { freq: 1762.0, gain: 0.15, decay: 1.4 },  // A6
        { freq: 2349.32, gain: 0.08, decay: 0.9 }, // D7
      ];

      partials.forEach(({ freq, gain, decay }) => {
        const osc = ctx.createOscillator();
        const partialGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        partialGain.gain.setValueAtTime(gain, now);
        partialGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(partialGain);
        partialGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decay + 0.1);
      });
      break;
    }

    case 'digital': {
      // Modern electronic double beep
      const beeps = [0, 0.22, 0.44];
      beeps.forEach((start) => {
        const osc = ctx.createOscillator();
        const beepGain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1046.5, now + start); // C6

        beepGain.gain.setValueAtTime(0, now + start);
        beepGain.gain.linearRampToValueAtTime(0.18, now + start + 0.01);
        beepGain.gain.setValueAtTime(0.18, now + start + 0.09);
        beepGain.gain.exponentialRampToValueAtTime(0.0001, now + start + 0.12);

        osc.connect(beepGain);
        beepGain.connect(masterGain);

        osc.start(now + start);
        osc.stop(now + start + 0.13);
      });
      break;
    }

    case 'zen': {
      // Deep resonant Tibetan bowl sound
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const zenGain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(216.0, now); // A3 slightly detuned
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(434.5, now); // A4 harmonic with gentle beat frequency

      zenGain.gain.setValueAtTime(0.001, now);
      zenGain.gain.linearRampToValueAtTime(0.45, now + 0.08);
      zenGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc1.connect(zenGain);
      osc2.connect(zenGain);
      zenGain.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.3);
      osc2.stop(now + 3.3);
      break;
    }
  }
}

/**
 * Play subtle soft mechanical clock tick
 */
export function playTickingSound(volumePercent = 25): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const vol = Math.max(0, Math.min(1, (volumePercent / 100) * 0.15));
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  const now = ctx.currentTime;
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.015);

  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.025);
}

/**
 * Subtle tactile UI button click sound
 */
export function playButtonSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(240, now + 0.035);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.045);
}

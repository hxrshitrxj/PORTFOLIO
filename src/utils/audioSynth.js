// Web Audio API ambient synthesizer for cinematic headphones experience
let audioCtx = null;
let masterGain = null;
let filterNode = null;
let oscillators = [];
let isPlaying = false;

export function toggleAudio() {
  if (isPlaying) {
    stopAudio();
    return false;
  } else {
    startAudio();
    return true;
  }
}

export function isAudioPlaying() {
  return isPlaying;
}

export function startAudio() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Master gain with smooth ramp
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 2.5);

    // Warm Low Pass Filter
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(280, audioCtx.currentTime);
    filterNode.Q.setValueAtTime(3.5, audioCtx.currentTime);

    // Sub Bass + Lush Harmonic Pad (tuned to D minor cinematic chord: D2, A2, F3, C4)
    const baseFreqs = [73.42, 110.0, 174.61, 261.63];
    oscillators = [];

    baseFreqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
      const oscGain = audioCtx.createGain();

      osc.type = idx === 0 ? 'sine' : idx === 1 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Subtle detune for lush analog warmth
      osc.detune.setValueAtTime((idx - 1.5) * 8, audioCtx.currentTime);

      oscGain.gain.setValueAtTime(idx === 0 ? 0.45 : idx === 1 ? 0.3 : 0.15, audioCtx.currentTime);

      if (panner) {
        panner.pan.value = (idx % 2 === 0 ? -0.4 : 0.4);
        osc.connect(oscGain);
        oscGain.connect(panner);
        panner.connect(filterNode);
      } else {
        osc.connect(oscGain);
        oscGain.connect(filterNode);
      }

      osc.start();
      oscillators.push(osc);
    });

    filterNode.connect(masterGain);
    masterGain.connect(audioCtx.destination);
    isPlaying = true;
  } catch (err) {
    console.warn('Audio playback not supported or user interaction needed', err);
    isPlaying = false;
  }
}

export function stopAudio() {
  if (masterGain && audioCtx) {
    try {
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch { /* silent */ }
        });
        oscillators = [];
        isPlaying = false;
      }, 900);
    } catch {
      isPlaying = false;
    }
  } else {
    isPlaying = false;
  }
}

// Modulate audio filter with scroll velocity and progress
export function updateAudioWithScroll(progress, velocity) {
  if (!isPlaying || !filterNode || !audioCtx) return;
  try {
    const baseFreq = 250 + progress * 500;
    const velocityBoost = Math.min(Math.abs(velocity) * 45, 1200);
    const targetFreq = Math.min(2200, baseFreq + velocityBoost);
    
    filterNode.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.08);
  } catch {
    /* silent */
  }
}

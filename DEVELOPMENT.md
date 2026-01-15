# Sound Safari - Development Notes

## Audio Engine Implementation

The AudioEngine uses the Web Audio API for all sound processing. Key features:

### Microphone Access
```typescript
await audioEngine.initializeMicrophone()
```

### Volume Detection
```typescript
const volume = audioEngine.getVolume() // 0.0 to 1.0
```

### Pitch Detection
```typescript
const pitch = audioEngine.getPitch() // Frequency in Hz
```

### Vocalization Detection
```typescript
const isVocalizing = audioEngine.isVocalizing() // true/false
```

## Emotion Detection Algorithm

The EmotionDetector analyzes voice characteristics:

- **Happy**: Moderate pitch (200-300 Hz), moderate volume (0.15-0.3)
- **Excited**: High pitch (>300 Hz), high volume (>0.3), fast tempo
- **Calm**: Low pitch (<200 Hz), low volume (<0.2), slow tempo
- **Distressed**: Very high pitch (>350 Hz), very high volume (>0.4)

### Trigger Comfort
Comfort sounds are triggered when:
- 3+ consecutive distressed readings
- Emotional trend shows sustained distress
- Only if `autoComfortEnabled` is true

## State Management

Using Zustand for simple, performant state management:

```typescript
const { 
  profile, 
  gameState, 
  echoState,
  setPhase,
  incrementScore 
} = useAppStore()
```

## Phase Flow

```
Home → Setup Profile → Start Game
  ↓
Discovery Phase (5 sounds)
  ↓
Expression Phase (8 animals)
  ↓
Creation Phase (4 rhythms + free play)
  ↓
End Session → View Insights
```

## Animation Strategy

Using Framer Motion for:
- Phase transitions (slide in/out)
- Echo character movements
- Listening indicators
- Success celebrations
- Comfort overlay

## Performance Optimization

- Audio analysis runs at 10 Hz (every 100ms)
- Emotion detection at 1 Hz (every second)
- Session auto-save every 30 seconds
- Lazy loading for phase components

## Browser Compatibility

Requires:
- Web Audio API
- MediaDevices.getUserMedia
- Blob/File API
- LocalStorage

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Testing Checklist

### Functional Testing
- [ ] Microphone permission handling
- [ ] Profile creation and persistence
- [ ] Comfort sound recording (5s)
- [ ] Phase progression (Discovery → Expression → Creation)
- [ ] Emotion detection accuracy
- [ ] Auto-comfort triggering
- [ ] Session data recording
- [ ] Max duration auto-end

### UX Testing
- [ ] Touch target size (min 44x44px)
- [ ] Text readability at distance
- [ ] Color contrast (WCAG AA)
- [ ] Animation smoothness (60fps)
- [ ] Audio clarity
- [ ] Loading states
- [ ] Error handling

### Edge Cases
- [ ] No microphone permission
- [ ] Microphone disconnect during session
- [ ] Browser tab backgrounded
- [ ] Very quiet environment
- [ ] Very loud environment
- [ ] Rapid phase completion
- [ ] Profile without comfort sounds

## Deployment Considerations

### Production Build
```bash
npm run build
```

### Environment Variables
None required - all processing is local

### Hosting Options
- Static hosting (Netlify, Vercel, GitHub Pages)
- Web server (Nginx, Apache)
- Electron app (for desktop)
- Capacitor (for mobile apps)

### Performance Tips
- Enable gzip compression
- Use CDN for assets
- Implement service worker for PWA
- Lazy load phase components
- Optimize image assets

## Known Limitations

1. **Audio Processing**: Simplified pitch/emotion detection - production version would use ML models
2. **Sound Library**: Currently uses text descriptions - would need real audio files
3. **Voice Speed**: Not yet implemented - Echo speaks at normal speed only
4. **Offline Mode**: Requires initial load with internet connection
5. **Multi-user**: Single profile only - no user switching

## Future Technical Improvements

### Phase 1 (MVP+)
- Real audio file library
- TensorFlow.js for emotion detection
- Service worker for offline functionality
- PWA manifest
- Enhanced rhythm detection

### Phase 2 (Advanced)
- Speech-to-text for word recognition
- Musical note detection
- Tempo synchronization
- Multi-language support
- Cloud backup (optional, opt-in)

### Phase 3 (Professional)
- Machine learning model training
- Personalized difficulty adaptation
- Advanced analytics dashboard
- Integration with smart speakers
- Therapist collaboration tools

## Security Considerations

- No external API calls
- No data transmission
- LocalStorage encryption (consider for sensitive data)
- CSP headers in production
- Regular dependency updates
- Input sanitization for text fields

## Accessibility Features to Add

- Screen reader support (ARIA labels)
- Keyboard navigation
- High contrast mode
- Reduced motion mode
- Configurable text size
- Alternative input methods

---

For questions or technical support, consult the codebase or create an issue in the repository.
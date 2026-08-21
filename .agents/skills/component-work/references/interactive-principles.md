# Interactive component principles

Use this reference only for interaction beyond ordinary hover, focus, and disclosure states.

## Choose the smallest installed mechanism

1. Prefer CSS for hover, focus, simple transitions, and keyframe loops.
2. Use Framer Motion for React state transitions, enter/exit behavior, layout animation, and modest scroll-linked effects.
3. Use browser APIs such as `IntersectionObserver` when they are simpler than a motion dependency.
4. Do not write GSAP, ScrollTrigger, SplitText, Lenis, Lottie, or particle code unless the dependency already exists or the user authorizes adding it.

One DOM element should have one animation owner. Do not let CSS transitions, Framer Motion, and an imperative animation library compete for the same transform or opacity.

## State and performance

- Keep trigger state such as `isOpen` or `activeTab` in React state.
- Keep per-frame animation values out of React state; use motion values, refs, or the animation engine.
- Prefer transform and opacity. Avoid animating layout properties such as width, height, margin, or positional offsets when a transform can express the same visible behavior.
- Define reusable variants and transition presets outside the component when doing so prevents recreation or keeps a shared motion language.
- Add `will-change` only immediately around a measured animation need; remove it afterward.

## Cleanup and stability

- Remove event listeners, observers, animation frames, timers, and imperative animation instances on unmount.
- Verify behavior under React Strict Mode and repeated mount/unmount cycles.
- Keep scroll calculations responsive to container and viewport changes; define overflow and reduced-motion fallbacks.
- Preserve the component's public behavior when refactoring animation internals.

## Accessibility

- Respect `prefers-reduced-motion` and provide a no-motion or simplified path.
- Avoid flashes faster than three times per second.
- Preserve focus order, keyboard access, semantic controls, and readable content when animation is disabled.
- Do not make important content available only after a gesture or animation completes.

## Review checklist

- The interaction communicates a user-visible state change or hierarchy.
- CSS was considered before JavaScript animation.
- No per-frame React rerender loop was introduced.
- Every effect has cleanup.
- Reduced motion, keyboard use, and responsive reflow remain functional.
- The implementation uses only installed, authorized dependencies.

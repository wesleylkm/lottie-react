1. How we fetch resource?
   `lottie-web` itself provide a `path` property, it will fetch the animationData itself

However, we have no control on the fetching itself.

If we want to do **fetching ourselves**, we can abort the fetching as soon as the Component begin unmount.

2. Lottie-web allow us to attach listener on few of the event below

```ts
const AnimationEventName = [
  "enterFrame",
  "loopComplete",
  "complete",
  "segmentStart",
  "destroy",
  "config_ready",
  "data_ready",
  "DOMLoaded",
  "error",
  "data_failed",
  "loaded_images",
];
```

Which event should we expose to user?

3. We need to know which property is allow to change **after config** (means able to change when animation is running)

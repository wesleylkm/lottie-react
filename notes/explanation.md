# Event

Lottie-web allow us to add event listener to the instance.
Animation Name is below

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

### enterFrame

When animation is animating, **each time** it changing frame, it will trigger this event.

### loopComplete

If we set **true for loop property**, when animation finished one loop (end of frame), this event will be trigger.

> If loop property is false, this event won't trigger

### complete

This event will **only fire** if the `loop = false`, during animation ended

### destroy

Fire when we call `lottieInstance.destroy()`

> If we unmount the component/hook, it won't fire destroy, we have to call it manually

### config_ready

Fire when initial config is done (need to understand more, what does it means?)

### data_ready

Fire when all the animation data begin loaded completely.

### DOMLoaded

Fire when element **added to the DOM**

### error

We need to know what is this... from the sourcecode, i can't found something call `this.trigger('error')`.

### data_failed

Fire when unable to load part of animation data

### loaded_images

Fire when all image loaded successfully
[Issue](https://github.com/airbnb/lottie-web/issues/1255)

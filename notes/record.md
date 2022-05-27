1. We no need to implement fetch. Since lottie-web already provided it. Fetch using `path` property when loading animation. If user want to control the fetching, there should fetch the .json themselves. And pass it as `animationData`.

2. `animationData` has higher priority than `path`,

3. For now, if user pass **invalid url/animationData**, there is no error begin propagated. We can get error from the event listener, so before we make error handling, we need to do **EventListener** first.

4. There are few cases think about when **handling error for lottie-web**

- If we use `path`, and it is invalid, it will trigger **error event**.
- But if the **animationData JSON** is corrupted, **I think** we have no way to detect it. Even `try catch` is unable to catch it. (Can look at the source code when free).
- We need a way to trigger re-render, so user can **reload** the component when there are error (for example fetch timeout)

5. We should allow user to **reload**, if unable to load animation data at the **first try**

6. When <OffScreen /> API is ready, we want to make it compatible. (make use of **initialMount** Ref)

7. `Only animationData` property can use playSegments before DOMLoaded, if want `path` property works too, we need to do below

```ts
const lottieInstance = // Initialize
  lottieInstace.addEventListener("DOMLoaded", () => {
    lottieInstance.playSegments([1, 10], true);
  });
```

[Refer](https://github.com/airbnb/lottie-web/issues/1039)

8. For `hoverToPlay`, `autoplay` need to be disabled. Because if user want to use hoverToPlay, means they want to play and pause the animation by pointer not button (i assume).

9. To get the exact **Number of Frame** from `enterFrame callback` We need to set `subFrame(false)` and access `instance.totalFrames`
   [Refer]("https://github.com/airbnb/lottie-web/issues/967")

10. `totalFrames` is only available after/during the `DOMLoaded` event callback. So we need to separate the DOMLoaded event and **set totalFrame** of the animation

11. `canvas` rendering has the highest quality, then html, svg

12. There is a `resize()` method in AnimationItem, It is use for `canvas/html renderer`, Canvas renderer won't scale with viewport, so we need to resize when viewport is changing
    [Refer](https://github.com/airbnb/lottie-web/issues/2230)

13. When animation `totalFrame` is 61, the maximum `currentFrame` can go is 60. In [LottieFile's Website](https://lottiefiles.com), their player didnot reach 61 actually. But they indicate it is 61.

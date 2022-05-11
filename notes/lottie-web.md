This markdown is use to note what is provided by **lottie-web**.
[Link]("https://github.com/airbnb/lottie-web")

1. We will see what API does it provided.
2. Think how to make use of the API and create Wrapper.

### <u>lottie.loadAnimation()</u>
`lottie.loadAnimation()` will start the animation.
It only take **exactly one param (option)**

option's property
1. animationData : an **object** that contain the animation data. (**from JSON**)
2. path : where to get the animation data. (path and animationData is mutually exclusive 两个只能其中一个).
3. loop : how many iteration. `true` means infinite iteration
4. autoplay: start animation when ready
5. name
6. renderer : which browser renderer (svg, canvas or html)
7. container : a DOM element that animation **render in**

by calling this function, it will return a **instance**, this instance has method to control the animation.


### <u>Lottie Instance</u>
when we call **loadAnimation()**, it will return a lottie instance.

```js
const lottieInstance = lottie.loadAnimation({
  ...options
});
```

lottie instance has few method. (We can make use of these method)

1. play
2. stop (reset to initial frame)
3. pause
4. setLocationHref(locationHref), use when mask issues???
5. setSpeed
6. goToAndStop(value, isFrame), isFrame means value is base on **frame or time**
7. goToAndPlay(value, isFrame)
8. setDirection
9. playSegments(segments, forceFlag), segments can be **Single Array** or **Multiple two value Array [fromFrame, toFrame]**, second params force jump to next segment
10. setSubframe(flag), if `false`, i will follow original ***AE Frame**, or update as fast as possible
11. destroy, remove the instance



# <u>Design</u>
I plan to write the component as a **Functional Component**.
It will contain few component, but the most important one is the `Player`.

I also hope to provide API for user to customize everything if they want to. So I will make it a **React Hook**. That will return thing such as
1. Lottie instance
2. Some method that can call
3. A **ref**, that use to **mount the Instance**

Some thing like this
```js
const { containerRef, play, ...rest } = useLottieWeb({}: options);
```

The `<Player />` component will use the hook internally.

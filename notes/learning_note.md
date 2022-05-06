# <u>Leaning Note</u>

This note is use to record my thought when rewriting the library.

### Current lottie-react implementation

[Link]("https://github.com/LottieFiles/lottie-react")

**6/5/2022**
This library consist of **5** component in the repo.

1. ColorPicker
2. Controls
3. Player
4. Popover (Written in **Function Component**)
5. Seeker

It is a Wrapper on [lottie-web]("https://github.com/airbnb/lottie-web").

**Current Bug**

1. It will display double component. [Github link]("https://github.com/LottieFiles/lottie-react/issues/77#issuecomment-1117232299").
   This issue happen because of `<React.StrictMode>`, and we can't spot the issue on browser because **current implentation** make use of `over-flow: hidden`. If we remove `style props` in this example, we will see the double component. [Stackblitz]("https://stackblitz.com/edit/react-3pkndk?file=src%2FApp.js")

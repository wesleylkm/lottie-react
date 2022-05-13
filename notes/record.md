1. We no need to implement fetch. Since lottie-web already provided it. Fetch using `path` property when loading animation. If user want to control the fetching, there should fetch the .json themselves. And pass it as `animationData`.

2. `animationData` has higher priority than `path`,

3. For now, if user pass **invalid url/animationData**, there is no error begin propagated. We can get error from the event listener, so before we make error handling, we need to do **EventListener** first.

4. There are few cases think about when **handling error for lottie-web**

- If we use `path`, and it is invalid, it will trigger **error event**.
- But if the **animationData JSON** is corrupted, **I think** we have no way to detect it. Even `try catch` is unable to catch it. (Can look at the source code when free).
- We need a way to trigger re-render, so user can **reload** the component when there are error (for example fetch timeout)

5. We should allow user to **reload**, if unable to load animation data at the **first try**

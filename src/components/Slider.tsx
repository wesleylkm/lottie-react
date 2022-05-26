import { useSlider, useSliderThumb } from "@react-aria/slider";
import { useSliderState } from "@react-stately/slider";
import { useNumberFormatter } from "@react-aria/i18n";
import { useFocusRing } from "@react-aria/focus";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { mergeProps } from "@react-aria/utils";
import { useRef } from "react";

const Slider = (props) => {
  const { value, maxValue, onChange } = props;

  const trackRef = useRef(null);

  const numberFormatter = useNumberFormatter();
  const state = useSliderState({
    numberFormatter,
    maxValue: maxValue < 0 ? 100 : maxValue,
    value: [value],
    onChange(values) {
      const [value] = values;

      onChange(value, true);
    },
  });
  const { groupProps, trackProps } = useSlider(
    {
      "aria-label": "Progress slider",
      "aria-labelledby": "slider",
    },
    state,
    trackRef
  );

  return (
    <div
      {...groupProps}
      style={{
        flex: "1",
        position: "relative",
        touchAction: "none",
      }}
    >
      <div
        ref={trackRef}
        {...trackProps}
        style={{
          position: "relative",
          height: 30,
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "gray",
            height: 3,
            top: 13,
            width: "100%",
          }}
        />

        <Thumb index={0} state={state} trackRef={trackRef} />
      </div>
    </div>
  );
};

const Thumb = (props) => {
  const { index, state, trackRef } = props;

  const inputRef = useRef(null);

  const { inputProps, thumbProps } = useSliderThumb(
    {
      index,
      inputRef,
      trackRef,
    },
    state
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      style={{
        position: "absolute",
        top: 7,
        transform: "translateX(-50%)",
        left: `${state.getThumbPercent(index) * 100}%`,
      }}
    >
      <div
        {...thumbProps}
        style={{
          width: 15,
          height: 15,
          backgroundColor: isFocusVisible
            ? "orange"
            : state.isThumbDragging(index)
            ? "dimgrey"
            : "gray",
        }}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </div>
    </div>
  );
};

export default Slider;

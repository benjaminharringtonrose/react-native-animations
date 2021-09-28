import Animated, {
  add,
  block,
  Clock,
  cond,
  multiply,
  neq,
  not,
  set,
  startClock,
  stopClock,
  timing,
  Value,
} from "react-native-reanimated";

export interface Vector<T extends Animated.Adaptable<number> = Animated.Adaptable<number>> {
  x: T;
  y: T;
}

type Transform2dName =
  | "translateX"
  | "translateY"
  | "scale"
  | "skewX"
  | "skewY"
  | "scaleX"
  | "scaleY"
  | "rotateZ"
  | "rotate";
type Transformations = {
  [Name in Transform2dName]: Animated.Adaptable<number>;
};
export type Transforms2d = (
  | Pick<Transformations, "translateX">
  | Pick<Transformations, "translateY">
  | Pick<Transformations, "scale">
  | Pick<Transformations, "scaleX">
  | Pick<Transformations, "scaleY">
  | Pick<Transformations, "skewX">
  | Pick<Transformations, "skewY">
  | Pick<Transformations, "rotateZ">
  | Pick<Transformations, "rotate">
)[];

export type TimingConfig = Partial<Omit<Animated.TimingConfig, "toValue">>;

export const transformOrigin = (
  { x, y }: Vector,
  ...transformations: Transforms2d
): Transforms2d => [
  { translateX: x },
  { translateY: y },
  ...transformations,
  { translateX: multiply(x, -1) },
  { translateY: multiply(y, -1) },
];

export const withTransition = (value: Animated.Node<number>, timingConfig: TimingConfig = {}) => {
  const init = new Value(0);
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    duration: 150,
    easing: (v: Animated.Adaptable<number>) => add(v, 0),
    ...timingConfig,
  };
  return block([
    cond(not(init), [set(init, 1), set(state.position, value)]),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
};

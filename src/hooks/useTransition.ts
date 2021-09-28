import { useEffect } from 'react';
import Animated, { Value } from 'react-native-reanimated';
import { useConst } from '.';
import { TimingConfig, withTransition } from '../util';

export const useTransition = (
  state: boolean | number,
  config: TimingConfig = {},
) => {
  const value: Animated.Value<number> = useConst(() => new Value(0));

  useEffect(() => {
    value.setValue(typeof state === 'boolean' ? (state ? 1 : 0) : state);
  }, [value, state]);

  const transition = useConst(() => withTransition(value, config));
  return transition;
};

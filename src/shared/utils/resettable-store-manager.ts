/* eslint-disable @typescript-eslint/no-extraneous-class */
import {
  create as createStoreAsHook,
  createStore as createVanillaStore,
} from 'zustand';
import type {
  Mutate,
  StateCreator,
  StoreApi,
  StoreMutatorIdentifier,
  UseBoundStore,
} from 'zustand';

type ResetStoreFn = () => void;
type InitialMos = [StoreMutatorIdentifier, unknown][];
type VanillaStore<T, Mos extends InitialMos> = Mutate<StoreApi<T>, Mos>;
type ReactHookStore<T, Mos extends InitialMos> = UseBoundStore<
  Mutate<StoreApi<T>, Mos>
>;

export class ResettableStoreManager {
  private static stores = new Set<ResetStoreFn>();

  public static resetAllStores(clearResetFns = false) {
    ResettableStoreManager.stores.forEach((resetFn) => resetFn());
    if (clearResetFns) {
      ResettableStoreManager.stores.clear();
    }
  }

  public static createResettableStore<T>(
    type: 'vanilla'
  ): <Mos extends InitialMos = []>(
    creator: StateCreator<T, [], Mos>,
    customResetFn?: (store: VanillaStore<T, Mos>) => ResetStoreFn
  ) => VanillaStore<T, Mos>;
  public static createResettableStore<T>(
    type: 'hook'
  ): <Mos extends InitialMos = []>(
    creator: StateCreator<T, [], Mos>,
    customResetFn?: (store: ReactHookStore<T, Mos>) => ResetStoreFn
  ) => ReactHookStore<T, Mos>;
  public static createResettableStore<T>(type: 'vanilla' | 'hook') {
    return <Mos extends InitialMos = []>(
      stateCreator: StateCreator<T, [], Mos>,
      customResetFn?: (
        store: ReactHookStore<T, Mos> | VanillaStore<T, Mos>
      ) => ResetStoreFn
    ) => {
      let store: VanillaStore<T, Mos> | ReactHookStore<T, Mos>;
      const defaultResetFn = (initialState: T) => () => {
        store.setState(initialState, true);
      };

      if (type === 'vanilla') {
        store = createVanillaStore(stateCreator);
      } else {
        store = createStoreAsHook(stateCreator);
      }

      ResettableStoreManager.stores.add(
        customResetFn?.(store) ?? defaultResetFn(store.getState())
      );

      return store;
    };
  }
}

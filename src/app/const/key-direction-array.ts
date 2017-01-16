import {SNAKE_DIRECTION} from "./snake-direction";
export const KEY_DIRECTION_ARRAY: any[] = [
  {key: 'ArrowUp', direction: SNAKE_DIRECTION.UP, opposite: SNAKE_DIRECTION.DOWN},
  {key: 'ArrowDown', direction: SNAKE_DIRECTION.DOWN, opposite: SNAKE_DIRECTION.UP},
  {key: 'ArrowLeft', direction: SNAKE_DIRECTION.LEFT, opposite: SNAKE_DIRECTION.RIGHT},
  {key: 'ArrowRight', direction: SNAKE_DIRECTION.RIGHT, opposite: SNAKE_DIRECTION.LEFT}
];

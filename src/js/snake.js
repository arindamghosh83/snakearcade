import { dropFirst, dropLast, merge, mod, rnd } from './base'
// Constants
export const NORTH = { x: 0, y:-1 }
export const SOUTH = { x: 0, y: 1 }
export const EAST  = { x: 1, y: 0 }
export const WEST  = { x:-1, y: 0 }

// Check if two points are equal
const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y

// Check if snake will eat apple on next move
const willEat   = state => pointEq(nextHead(state))(state.apple)

//Check if snake will crash on next move
const willCrash = state => state.snake.find(pointEq(nextHead(state)))
// check if move is valid wrt to previous move w/o any inverses in list of move  before including move in state
const isMoveValid = move => state =>
  state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0

  // Next values based on state
  //drop the first move after using it, or keep using the same move if only one move is left
const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves


// next state of apple based on whether snake will eat the apple
const nextApple = state => willEat(state) ? rndPos(state) : state.apple
const nextHead  = state => state.snake.length == 0
  ? { x: 2, y: 2 } // default start position
  : {
    x: mod(state.cols)(state.snake[0].x + state.moves[0].x), // current head position + position of current move
    y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
  }

  // next state of snake by adding next head to start of snake
const nextSnake = state => willCrash(state)
  ? []
  : (willEat(state)
    ? [nextHead(state)].concat(state.snake) // adding head to existing snake state
    : [nextHead(state)].concat(dropLast(state.snake)))  // adding head and removing tail to simulate moving

// Randomness
const rndPos = table => ({
  x: rnd(0)(table.cols - 1),
  y: rnd(0)(table.rows - 1)
})

// Initial state
export const initialState = () => ({
  cols:  20,
  rows:  14,
  moves: [EAST],
  snake: [],
  apple: { x: 16, y: 2 },
})
// function that produces the next state
export const next = state => ({
  ...state,
  moves: nextMoves(state),
  snake: nextSnake(state),
  apple: nextApple(state)
})

// merge move into current list of moves in state
export const enqueue = (state, move) => 
isMoveValid(move)(state)
  ? merge(state)({ moves: state.moves.concat([move]) })
  : state

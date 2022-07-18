import {BOARD_HEIGHT, BOARD_WIDTH, BOMBS, FIELD, VIEW} from "./config";

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const direction = (dx, dy) => {
    return [
        {x: dx + 1, y: dy + 1},
        {x: dx + 1, y: dy},
        {x: dx + 1, y: dy - 1},
        {x: dx, y: dy + 1},
        {x: dx, y: dy - 1},
        {x: dx - 1, y: dy + 1},
        {x: dx - 1, y: dy},
        {x: dx - 1, y: dy - 1},
    ]
}

export const array2D = (value) => {
    return new Array(BOARD_HEIGHT)
        .fill(null)
        .map(() => new Array(BOARD_WIDTH)
            .fill(null)
            .map(() => value))
}

export const setBy2DIndexIn2DArray = (array2D, dx, dy, value) => array2D
    .map((row, y) => y === dy
        ? row.map((item, x) => x === dx
            ? value
            : item
        )
        : row
    )

export const initViews = () => array2D(VIEW.FOG)

export const initFields = (dx, dy) => {
    const fields = array2D(FIELD.EMPTY)
    // placing bombs
    let i = BOMBS
    while (i > 0) {
        const x = random(0, BOARD_WIDTH)
        const y = random(0, BOARD_HEIGHT)
        if (fields[y][x] !== FIELD.BOMB && x !== dx && y !== dy) {
            fields[y][x] = FIELD.BOMB
            i--
        }
    }
    // placing number fields
    return fields.map((row, y) => {
        return row.map((field, x) => {
            if (field !== FIELD.BOMB) {
                let counter = 0
                direction(x, y)
                    .forEach(dir => {
                        if (fields?.[dir.y]?.[dir.x] === FIELD.BOMB) counter++
                    })
                return counter
            }
            return field
        })
    })
}

export const openArea = (dx, dy, fields, views) => {
    const cloneViews = views.map(row => row.map(view => view))
    openAreaRecursive(dx, dy, fields, cloneViews)
    return cloneViews
}

const openAreaRecursive = (dx, dy, fields, views) => {
    if (fields?.[dy]?.[dx] === undefined ||
        views[dy][dx] === VIEW.VISIBLE ||
        views[dy][dx] === VIEW.MARK) return
    views[dy][dx] = VIEW.VISIBLE
    if (fields[dy][dx] === FIELD.EMPTY) {
        direction(dx, dy).forEach(({x, y}) => openAreaRecursive(x, y, fields, views))
    }
}

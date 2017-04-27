/*

Algorithm outline

Assign ring orientations to tiles at every other unvisited row and column.
Row orientation is determined by tile location:
 - intersection (z)
 - row (x)
 - column (y)

Go through every just processed row, column, and z-column, and assign alternating lines to connecting tiles.

Repeat with twice the scale

0, 2,  4,  6,  8    1,  3,  5,  7,  9
0, 4,  8, 12, 16    2,  6,  10, 14, 18
0, 8, 16, 24, 32    4, 12, 20, 28, 36
                    8, 24, 40, ...

*/

enum Ring {
    x,
    y,
    xy,
}

interface Tile {
    ring: Ring,
}

type Plane = Tile[][];

function createPlane(width: number, height: number): Plane {
    const plane = []
    for (let y = 0; y < height; y++) {
        plane[y] = []
        for (let x = 0; x < width; x++) {
            plane[y][x] = []
        }
    }
    return plane
}

function addCorners(plane: Plane) {
    const height = plane.length;
    const width = plane[0].length;
    const maxScale = Math.max(width, height)
    for (let scale = 1; scale <= maxScale; scale *= 2) {
        for (let y = scale; y < height; y += 2 * scale) {
            for (let x = scale; x < width; x += scale) {
                plane[y][x].ring = Ring.x
            }
        }
        for (let x = scale; x < width; x += 2 * scale) {
            for (let y = scale; y < height; y += scale) {
                let tile = plane[y][x]
                if (tile.ring === Ring.x) {
                    tile.ring = Ring.xy
                } else {
                    tile.ring = Ring.y
                }
            }
        }
    }
}

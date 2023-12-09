import { createCherryBombFont } from '@tamagui/font-cherry-bomb'
import { createMunroFont } from '@tamagui/font-munro'
import { createSilkscreenFont } from '@tamagui/font-silkscreen'
import { createInterFont } from '@tamagui/font-inter'

export const cherryBombFont: any = createCherryBombFont()
export const munroFont: any = createMunroFont()
const silkscreenFont = createSilkscreenFont()
const headingFont = createInterFont({
    size: {
        5: 13,
        6: 15,
        9: 32,
        10: 44,
    },
    transform: {
        6: 'uppercase',
        7: 'none',
    },
    weight: {
        6: '400',
        7: '700',
    },
    color: {
        6: '$colorFocus',
        7: '$color',
    },
    letterSpacing: {
        5: 2,
        6: 1,
        7: 0,
        8: -1,
        9: -2,
        10: -3,
        12: -4,
        14: -5,
        15: -6,
    },
    // for native
    face: {
        700: { normal: 'InterBold' },
        800: { normal: 'InterBold' },
        900: { normal: 'InterBold' },
    },
})

const bodyFont = createInterFont(
    {
        face: {
            700: { normal: 'InterBold' },
        },
    },
    {
        sizeSize: (size) => Math.round(size * 1.1),
        sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
    }
)

// The fonts declaration
export const fonts = {
    body: bodyFont,
    heading: headingFont,
    silkscreen: silkscreenFont,
    munro: munroFont,
    cherryBomb: cherryBombFont,
    //Add fonts created
}
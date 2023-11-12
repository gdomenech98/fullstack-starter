import { ThemeToggle } from './ThemeToggle'
import { ThemeTint } from './Tints/useTint'
import React, {  } from 'react';
import {
  Text,
  TooltipGroup,
  TooltipSimple,
  VisuallyHidden,
  XGroup,
  XStack,
  YStack,
  isClient
} from 'tamagui'

import { ColorToggleButton } from './ColorToggleButton'
import { ContainerLarge } from './Container'
import { NextLink } from './NextLink'


export type HeaderProps = {
  floating?: boolean
  disableNew?: boolean
  showExtra?: boolean
  forceShowAllLinks?: boolean
  minimal?: boolean
  showAuth?: boolean
}

export function CustomHeader(props: any) {
  const [isScrolled, setIsScrolled] = React.useState(false)

  if (isClient) {
    React.useEffect(() => {
      const onScroll = () => {
        setIsScrolled(window.scrollY > 30)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }, [])
  }

  return (
    <>
      <XStack
        // @ts-ignore
        pos="fixed"
        top={0}
        left={0}
        right={0}
        ai="center"
        jc="center"
        zi={50000}
        $gtSm={{
          px: '$4',
        }}
      >
        <XStack width="100%" maw={1120} pos="relative">
          <XStack
            className={`ease-out all ms200 ${isScrolled ? 'blur-medium hover-highlights ' : ''
              }`}
            bbc="$borderColor"
            py="$1"
            y={3}
            ov="hidden"
            contain="paint"
            width="100%"
            bw={1}
            boc="transparent"
            br="$10"
            $sm={{
              br: 0,
              y: 0,
              py: '$2',
            }}
            {...(isScrolled && {
              $gtSm: {
                py: '$2',
                y: 5,
                boc: '$borderColor',
              },
            })}
          >
            <YStack o={isScrolled ? 0.75 : 0} fullscreen bc="$background" />
            <ContainerLarge>
              <ThemeTint>
                {React.useMemo(
                  () => (
                    <HeaderContents floating {...props} />
                  ),
                  [props]
                )}
              </ThemeTint>
            </ContainerLarge>
          </XStack>
          {/* do shadow separate so we can contain paint because its causing perf issues */}
          <XStack
            className={`ease-out all ms200`}
            zi={-1}
            br="$10"
            fullscreen
            {...(isScrolled && {
              $gtSm: {
                py: '$2',
                y: 5,
                elevation: '$3',
                boc: '$borderColor',
              },
            })}
          />
        </XStack>
      </XStack>
      <YStack height={54} w="100%" />
    </>
  )
}

const tooltipDelay = { open: 500, close: 150 }

export const HeaderContents = React.memo((props: HeaderProps) => {
  return (
    <XStack
      ai="center"
      position="relative"
      tag="header"
      jc="space-between"
      pos="relative"
      py={props.floating ? 0 : '$2'}
      zi={50000}
    >
      <XStack ai="center" space="$4">
        <TooltipGroup delay={tooltipDelay}>
          <XGroup boc="$color2" bw={1} mah={32} bc="transparent" ai="center" size="$3">
            <XGroup.Item>
              <ThemeToggle borderWidth={0} chromeless />
            </XGroup.Item>
            <XGroup.Item>
              <ColorToggleButton borderWidth={0} chromeless />
            </XGroup.Item>
          </XGroup>
        </TooltipGroup>
      </XStack>
      {/*  prevent layout shift */}
      <XStack
        h={40}
        jc="flex-end"
        miw={160}
        $xs={{ miw: 130 }}
        pointerEvents="auto"
        tag="nav"
      >
        <XStack ai="center" space="$3">
          {/* <HeaderLinks {...props} /> */}
          <NextLink target="_blank" href="https://github.com/gerarddomenechcobos1998">
            <TooltipSimple delay={0} restMs={25} label="Check my Github!">
              <YStack p="$2" opacity={0.7} hoverStyle={{ opacity: 1 }}>
                <VisuallyHidden>
                  <Text>Github</Text>
                </VisuallyHidden>
              </YStack>
            </TooltipSimple>
          </NextLink>
        </XStack>
      </XStack>
    </XStack>
  )
})


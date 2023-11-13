import {
  H1,
  YStack,
  H3,
  Paragraph
} from '@my/ui'
import { Button, Text } from 'tamagui'
import React, { useEffect } from 'react'
import { useTestStore } from './context/useTestStore';
import { DefaultLayout, PageGlow, ThemeTint, Card1, useTint } from '@my/ui/src';
import { styled, H2 } from '@my/ui';

export function TestScreen(props) {
  console.log(props)
  const { test, setTest } = useTestStore()
  const { tint } = useTint()
  useEffect(() => {
    console.log('TEST ATOM: ', test)
  }, [test])


  return (
    <YStack>
      <DefaultLayout
        footer={<></>}
      >
        <PageGlow />
        <YStack f={1} jc="center" p="$4" space >
          <YStack pe="none" zi={0} fullscreen className="bg-grid mask-gradient-up" />
          <YStack space="$4" display='flex' f={1}>
            <H1 ta="center">Test screen.</H1>
            <H2 ta="center" theme={"alt1"}>Subtitle</H2>
            <H3 ta="center" theme="alt2">This is subtitle</H3>
            <ThemeTint>
              <Card1 />
              <YStack space="$4">
                <Button hoverStyle={{boc: "$color7"}} bw={2} onPress={() => setTest("Patata")}>Button1</Button>
                <Button
                  accessibilityLabel={"Button3"}
                  size="$3"
                  borderRadius="$8"
                  x={-1}
                />
                <Tag theme="blue_alt2">Tag 1</Tag>
              </YStack>
            </ThemeTint>
          </YStack>
        </YStack>
      </DefaultLayout >
    </YStack >
  )
}

const Tag = styled(Text, {
  className: 'hero-tag text-decoration-none',
  fontFamily: 'inherit' as any,
  fontSize: 'inherit' as any,
  borderRadius: '$2',
  px: '$1',
  mx: '$-1',
  cursor: 'pointer',
  color: '$color',
  bc: '$color2',

  hoverStyle: {
    color: '$color',
    bc: '$color3',
  },

  variants: {
    active: {
      true: {
        color: '$color10',
        bc: '$color5',

        hoverStyle: {
          color: '$color12',
          bc: '$color5',
        },
      },
    },
  } as const,
})
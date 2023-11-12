import {
  H1,
  YStack,
  Button,
  Paragraph
} from '@my/ui'
import React, { useEffect } from 'react'
import { useTestStore } from './context/useTestStore';
import { DefaultLayout, SectionTinted, ThemeTint, TintSection, getDefaultLayout } from '@my/ui/src';

export function TestScreen(props) {
  console.log(props)
  const { test, setTest } = useTestStore()
  useEffect(() => {
    console.log('TEST ATOM: ', test)
  }, [test])
  return (
    <YStack>
      <DefaultLayout
        footer={<></>}
      >
        <ThemeTint >
          <YStack f={1} jc="center" ai="center" p="$4" space>
            <YStack space="$4" maw={600}>
              <YStack pe="none" zi={0} fullscreen className="bg-dot-grid mask-gradient-down" />
              <H1 ta="center">Test screen.</H1>
              <Button onPress={() => setTest("Patata")}>Change test atom</Button>
            </YStack>
          </YStack>
        </ThemeTint>
      </DefaultLayout >
    </YStack >
  )
}
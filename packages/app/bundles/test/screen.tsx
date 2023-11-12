import {
  H1,
  YStack,
} from '@my/ui'
import { Button } from 'tamagui';
import React, { useEffect } from 'react'
import { useTestStore } from './context/useTestStore';

export function TestScreen(props) {
  console.log(props)
  const {test, setTest} = useTestStore()
  useEffect(() => {
    console.log('TEST ATOM: ', test)
  },[test])
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Test screen.</H1>
        <Button onPress={() => setTest("Patata") }>Change test atom</Button>
      </YStack>
    </YStack>
  )
}
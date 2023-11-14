import React from 'react'
import {
  DefaultLayout, PageGlow, ThemeTint,
  useTint, H2, H1, YStack, DataTable
} from '@my/ui';
export function DashBoardScreen(props) {
  const { tint } = useTint()
  const data = [...props.data]
  return (
    <YStack>
      <DefaultLayout
        footer={<></>}
      >
        <PageGlow />
        <YStack f={1} jc="center" p="$4" space height="200vh" >
          <YStack space="$4" display='flex' f={1}>
            <H1 ta="center">Dashboard.</H1>
            <H2 ta="center" theme={"alt1"}>Users</H2>
            <ThemeTint>
              <YStack px="20%">
                <DataTable
                  schema={["id","identifier", "password", "type"]}
                  data={data}
                />
              </YStack>
            </ThemeTint>
          </YStack>
        </YStack>
      </DefaultLayout >
    </YStack >
  )
}

let data=[
  {
    name: 'id',
    type: 'string',
    description: `Optional for usage with Label`,
  },
  {
    name: 'size',
    type: 'SizeTokens',
    description: `Set the size of itself and pass to all inner elements`,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: `Select children API components`,
  },
  {
    name: 'value',
    type: 'string',
    description: `Controlled value`,
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: `Default value`,
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    description: `Callback on value change`,
  },
  {
    name: 'open',
    type: 'boolean',
    description: `Controlled open value`,
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    description: `Default open value`,
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: `Callback on open change`,
  },
  {
    name: 'dir',
    type: 'Direction',
    description: `Direction of text display`,
  },
  {
    name: 'name',
    type: 'string',
    description: `For use in forms`,
  },
  {
    name: 'native',
    type: 'NativeValue',
    description: `If passed, will render a native component instead of the custom one. Currently only \`web\` is supported.`,
  },
]
import React from 'react'
import {
  DefaultLayout, PageGlow, ThemeTint,
  useTint, YStack, DataTable, XStack, Paragraph, Accordion, Square
} from '@my/ui';
import { ChevronDown } from '@tamagui/lucide-icons'
import { User, Tag } from '@tamagui/lucide-icons'

const DashboardSideMenu = (props) => {

  const getIcon = (itemKey: string) => {
    const icons = {
      user: User
    }
    const defaultIcon = Tag
    return icons[itemKey] ?? defaultIcon
  }

  const sections = ["users", "tests"]
  return (
    <YStack w={"$18"}>
      <Accordion overflow="hidden" type="multiple">
        <Accordion.Item value="a1" >
          <Accordion.Trigger flexDirection="row" bw="$0">
            {({ open }) => (
              <>
                <Square mr="$4" animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
                <Paragraph>Domain</Paragraph>
              </>
            )}
          </Accordion.Trigger>
          {
            sections.map(section => (
              <Accordion.Content p="$4" fd="row" jc="center" cursor="poin">
                <XStack space="$4" ai="center">
                  <ThemeTint>
                    {
                      React.createElement(getIcon(section), { size:"$1", color:"$color8"})
                    }
                  </ThemeTint>
                  <Paragraph >
                    {section}
                  </Paragraph>
                </XStack>
              </Accordion.Content>
            ))
          }
        </Accordion.Item>
      </Accordion>
    </YStack >
  )
}

export function DashBoardScreen(props) {
  const { tint } = useTint()
  const data = [...props.data]

  return (
    <YStack bg="$color2" fullscreen>
      <DefaultLayout footer={<></>}>
        <XStack>
          <DashboardSideMenu />
          <PageGlow />
          <YStack f={1} jc="center" p="$6" space >
            <YStack space="$4" display='flex' f={1}>
              <YStack pl="$3">
                <DataTable
                  schema={["id", "identifier", "password", "type"]}
                  data={data}
                />
              </YStack>
            </YStack>
          </YStack>
        </XStack>
      </DefaultLayout>
    </YStack >
  )
}

let data = [
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
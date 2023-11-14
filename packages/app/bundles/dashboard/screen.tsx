import React, { useState } from 'react'
import {
  DefaultLayout, PageGlow, ThemeTint, YStack, Text, XStack, Paragraph, Accordion, Square, Separator, Checkbox
} from '@my/ui';
import { Check as CheckIcon } from '@tamagui/lucide-icons'
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
                      React.createElement(getIcon(section), { size: "$1", color: "$color8" })
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

const DashBoardDomainTable = ({ title, data, schema }: { title?: string, data: any[], schema: any[] }) => {
  const initialColumn = {}
  const columns = [
    { label: "id", selector: "id" },
    { label: "email", selector: "identifier" },
    { label: "type", selector: "type", cell: (row) => (<ThemeTint><Text bg="$color8" o={0.8} br="$11" py="$2" px="$3" color="$color4">{row.type}</Text></ThemeTint>) }
  ]
  const [selectedItem, setSelectedItem] = useState();
  const RowActions = ({ onPress }: any) => {
    return (<XStack w="$6">
      <Checkbox size={"$6"} onPress={onPress}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>
    </XStack>)
  }
  return (
    <YStack p="$6">
      <XStack mb="$6">
        <Paragraph fontSize={"$5"}>{title + " ["}</Paragraph>
        <ThemeTint><Paragraph fontSize={"$5"} theme={"alt2"}>{data.length}</Paragraph></ThemeTint>
        <Paragraph>{"]"}</Paragraph>
      </XStack>
      <YStack >
        <XStack minHeight="$6" flex={1}>
          <RowActions onPress={() => console.log('SELECTED ALL!')} />
          {
            columns.map((column, key) => (
              <XStack key={key} flex={1} width={column.width ?? "100%"}>
                <ThemeTint>
                  <Paragraph fontWeight={"700"} theme={"alt2"}>{column.label}</Paragraph >
                </ThemeTint>
              </XStack>
            ))
          }
        </XStack>
        {/* ROWS */}
        {
          data.map(item => (
            <YStack onPress={() => setSelectedItem(item)}>
              <XStack key={item.id} minHeight="$6" flex={1} ai="center">
                <RowActions onPress={() => console.log('Selected: ', item.id)} />
                {columns.map(column => (
                  <XStack key={`${item.id}-${column.selector}`} flex={1} width={column.width ?? "100%"}>
                    {
                      column.cell ?
                        column.cell(item)
                        : <Text>{item[column.selector]}</Text>
                    }
                  </XStack>
                ))}
              </XStack>
              <Separator />
            </YStack>
          ))
        }
      </YStack>
    </YStack >
  )
}

export function DashBoardScreen(props) {
  const data = [...props.data]
  return (
    <YStack bg="$color2" fullscreen>
      <DefaultLayout footer={<></>}>
        <XStack f={1}>
          <DashboardSideMenu />
          <PageGlow />
          <YStack f={1} m="$3" bg="$color3" br="$8" >
            <DashBoardDomainTable
              data={data}
              schema={["id", "identifier", "type"]}
              title={"Users"}
            />
          </YStack>
        </XStack>
      </DefaultLayout>
    </YStack >
  )
}

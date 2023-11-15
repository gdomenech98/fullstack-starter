import React, { useEffect, useState } from 'react'
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
  const columns = [
    { label: "id", selector: "id" },
    { label: "email", selector: "identifier" },
    { label: "type", selector: "type", cell: (row) => (<ThemeTint><Text bg="$color6" br="$11" py="$2" px="$3" color="$color10">{row.type}</Text></ThemeTint>) }
  ]

  const [selectedAll, setSelectedAll] = useState(false)
  const [selectedItems, setSelectedItems] = useState<any>([]);

  useEffect(() => {
    if (selectedAll) {
      console.log('DEV: data', data)
      setSelectedItems(data)
    }
    else {
      setSelectedItems([])
    }
  }, [selectedAll])

  const toggeSelect = (item) => {
    const itemFound = selectedItems.find(elem => elem.id === item.id)
    let newArray = itemFound ? 
                    selectedItems.filter(elem => elem.id !== item.id )
                    :selectedItems.concat(item)
    setSelectedItems(newArray)
  }

  useEffect(() => {
    console.log('DEV: aaaa', selectedItems)
  },[selectedItems])

  return (
    <YStack p="$6">
      <XStack mb="$6">
        <Paragraph fontSize={"$5"}>{title + " ["}</Paragraph>
        <ThemeTint><Paragraph fontSize={"$5"} theme={"alt2"}>{data.length}</Paragraph></ThemeTint>
        <Paragraph>{"]"}</Paragraph>
      </XStack>
      <YStack >
        <XStack minHeight="$6" flex={1}>
          <RowActions checked={selectedAll} onPress={() => setSelectedAll(!selectedAll)} />
          {
            columns.map((column, key) => (
              <XStack key={key} flex={1} width={column.width ?? "100%"}>
                <ThemeTint>
                  <Paragraph fontWeight={"600"} color={"$color7"}>{column.label}</Paragraph >
                </ThemeTint>
              </XStack>
            ))
          }
        </XStack>
        {/* ROWS */}
        {
          data.map(item => (
            <YStack>
              <XStack key={item.id} minHeight="$6" flex={1} ai="center">
                <RowActions checked={selectedItems.map(elem => elem.id).includes(item.id)} onPress={() => toggeSelect(item)} />
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

function RowActions({ onPress, checked }: any) {
  return (<XStack w="$6">
    <Checkbox checked={checked} size={"$6"} onPress={onPress}>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox>
  </XStack>)
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

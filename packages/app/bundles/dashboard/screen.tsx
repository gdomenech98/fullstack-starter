import React, { useEffect, useState } from 'react'
import {
  DefaultLayout, PageGlow, ThemeTint, YStack, Text,
  XStack, Paragraph, Accordion, Square, Separator, Checkbox,
  useTint, Popover, Adapt, Label, Button
} from '@my/ui';
import { Check as CheckIcon } from '@tamagui/lucide-icons'
import { ChevronDown, MoreVertical } from '@tamagui/lucide-icons'
import { User, Tag } from '@tamagui/lucide-icons'

export function DashBoardScreen(props) {
  const data = [...props.data]
  return (
    <YStack bg="$color4" fullscreen>
      <DefaultLayout footer={<></>}>
        <XStack f={1}>
          <DashboardSideMenu />
          <PageGlow />
          <YStack f={1} m="$3" bg="$color3" br="$8" elevation={"$0.75"}>
            <DashBoardDomainTable
              columns={
                [
                  { label: "id", selector: "id" },
                  { label: "email", selector: "identifier" },
                  { label: "password", selector: "password", cell: (row) => (<Text theme="alt1">********</Text>) },
                  { label: "type", selector: "type", cell: (row) => (<ThemeTint><Text bg="$color6" br="$11" py="$2" px="$3" color="$color10">{row.type}</Text></ThemeTint>) }
                ]
              }
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

function DashboardSideMenu(props) {

  const getIcon = (itemKey: string) => {
    const icons = {
      user: User
    }
    const defaultIcon = Tag
    return icons[itemKey] ?? defaultIcon
  }

  const sections = ["users", "tests"]
  const [section, setSection] = useState(sections[0]);
  const { tint } = useTint();

  return (
    <YStack w={"$18"}>
      <Accordion overflow="hidden" type="multiple" defaultValue={["Domain"]}>
        <Accordion.Item value="Domain">
          <Accordion.Trigger flexDirection="row" bw="$0" bg="$color4">
            {({ open }) => (
              <XStack>
                <Square mr="$4" animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
                <Paragraph>Domain</Paragraph>
              </XStack>
            )}
          </Accordion.Trigger>
          {
            sections.map(sec => (
              <Accordion.Content onPress={() => setSection(sec)} fd="row" p={0} cursor="pointer" bg="$color4">
                <XStack py="$2" my="$1" w="90%" btrr="$10" bbrr="$10" bg={section == sec ? "$color6" : undefined} theme={tint as any}>
                  <XStack f={1} jc="center" ai="center" space="$4">
                    <ThemeTint>
                      {
                        React.createElement(getIcon(sec), { size: "$1", color: "$color8" })
                      }
                    </ThemeTint>
                    <Paragraph >
                      {sec}
                    </Paragraph>
                  </XStack>
                </XStack>
              </Accordion.Content>
            ))
          }
        </Accordion.Item>
      </Accordion>
    </YStack >
  )
}

function DashBoardDomainTable({ title, data, columns, schema }: { title?: string, columns: any[], data: any[], schema: any[] }) {
  const [selectedAll, setSelectedAll] = useState(false)
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const { tint } = useTint()

  useEffect(() => {
    setSelectedItems(selectedAll ? data : [])
  }, [selectedAll])

  const toggeSelect = (item) => {
    const itemFound = selectedItems.find(elem => elem.id === item.id)
    let newArray = itemFound ?
      selectedItems.filter(elem => elem.id !== item.id)
      : selectedItems.concat(item)
    setSelectedItems(newArray)
  }

  return (
    <YStack>
      <XStack pt="$6" px="$6">
        <Paragraph fontSize={"$5"}>{title + " ["}</Paragraph>
        <ThemeTint><Paragraph fontSize={"$5"} color={"$color8"}>{data.length}</Paragraph></ThemeTint>
        <Paragraph fontSize={"$5"}>{"]"}</Paragraph>
      </XStack>
      <YStack>
        <XStack minHeight="$6" flex={1} p="$6">
          <RowActions
            options={[
              {
                type: "checkbox",
                checked: selectedAll,
                action: () => setSelectedAll(!selectedAll)
              }
            ]}
          />
          {
            columns.map((column, key) => (
              <XStack key={key} flex={1} width={column.width ?? "100%"}>
                <ThemeTint>
                  <Paragraph fontWeight={"600"} color={"$color8"}>{column.label}</Paragraph >
                </ThemeTint>
              </XStack>
            ))
          }
        </XStack>
        {/* ROWS */}
        {
          data.map(item => (
            <YStack hoverStyle={{ bg: "$color4" }}>
              <XStack key={item.id} minHeight="$6" flex={1} ai="center" px="$6">
                <RowActions
                  options={[
                    {
                      type: "checkbox",
                      checked: selectedItems.map(elem => elem.id).includes(item.id),
                      action: () => toggeSelect(item)
                    },
                    {
                      type:"options",
                      options: [
                        {
                          label: "delete",
                          labelColor: "$red10",
                          action: () => console.log('DELETING', item.id)
                        }
                      ]
                    }
                  ]}
                />
                {columns.map(column => (
                  <XStack key={`${item.id}-${column.selector}`} flex={1} width={column.width ?? "100%"}>
                    {
                      column.cell ?
                        column.cell(item)
                        : <Text theme="alt1">{item[column.selector]}</Text>
                    }
                  </XStack>
                ))}
              </XStack>
              <Separator borderColor={"$color8"} />
            </YStack>
          ))
        }
      </YStack>
    </YStack >
  )
}

function RowActions({ options }: any) {
  const { tint } = useTint()
  return (<XStack w="$6" ai="center" space="$2" mr="$2">
    {
      options.find(opt => opt.type == 'checkbox') ?
        <Checkbox checked={options.find(opt => opt.type == 'checkbox')?.checked} size={"$6"} onPress={options.find(opt => opt.type == 'checkbox')?.action} bg="$color4">
          <Checkbox.Indicator theme={tint as any}>
            <CheckIcon color="$color8" />
          </Checkbox.Indicator>
        </Checkbox>
        : null
    }
    {
      options.find(opt => opt.type == "options") ?

        <Popover size="$5" allowFlip placement='bottom'>
          <Popover.Trigger asChild>
            <XStack w="$2" h="$2" ai="center" theme={tint as any}>
              <MoreVertical color="$color7" />
            </XStack>
          </Popover.Trigger>
          <Popover.Content
            borderWidth={1}
            borderColor="$borderColor"
            enterStyle={{ y: -10, opacity: 0 }}
            exitStyle={{ y: -10, opacity: 0 }}
            elevate
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
          >
            <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
            <YStack>
              {
                options.find(opt => opt.type == "options")?.options?.map(opt => (
                  <XStack onPress={opt.action} cursor="pointer">
                    <Paragraph color={opt?.labelColor}>{opt.label}</Paragraph>
                  </XStack>
                ))
              }

            </YStack>
          </Popover.Content>
        </Popover>
        : null
    }
  </XStack>)
}
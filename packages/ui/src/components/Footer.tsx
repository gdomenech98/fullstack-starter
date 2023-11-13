import { H4, Paragraph, Spacer, Text, XStack, YStack } from 'tamagui'
import { ContainerLarge } from './Container'
import { ExternalIcon } from './ExternalIcon'
import { ParagraphLink } from './Link'

export const CustomFooter = () => {
  return (
    <YStack tag="footer" pos="relative">
      <ContainerLarge>
        <XStack py="$7" $sm={{ flexDirection: 'column', ai: 'center' }}>
          <YStack
            ai="flex-start"
            $sm={{ ai: 'center' }}
            py="$5"
            flex={2}
            mt="$-1"
            mb="$2"
            px="$4"
            space="$4"
          >
            <Text
              className="clip-invisible"
              position="absolute"
              width={1}
              height={1}
              padding={0}
              margin={-1}
              overflow="hidden"
            >
              homepage
            </Text>
            <Paragraph mt="$2" size="$3">
              by{' '}
              <ParagraphLink
                // @ts-ignore
                fontSize="inherit"
                href="https://github.com/gerarddomenechcobos1998?tab=repositories"
                target="_blank"
              >
                gerard
              </ParagraphLink>
            </Paragraph>
          </YStack>

          {/* <YStack
            ai="flex-start"
            $sm={{ ai: 'center' }}
            px="$4"
            py="$5"
            flex={1.5}
            space="$3"
          >
            <Paragraph mb="$3" size="$5">
              Overview
            </Paragraph>
            <ParagraphLink href="/">About me</ParagraphLink>
            <ParagraphLink href="/">Methodology</ParagraphLink>
            <ParagraphLink href="/">Profesional projects</ParagraphLink>
          </YStack> */}

          <YStack
            ai="flex-start"
            $sm={{ ai: 'center' }}
            px="$4"
            py="$5"
            flex={1.5}
            space="$3"
          >
            <Paragraph mb="$3" size="$5" >
              Social
            </Paragraph>
            <XStack space="$1" ai="center">
              <ParagraphLink target="_blank" href="https://github.com/Sixedge-es/software_Arquitecture">Blog</ParagraphLink>
            </XStack>
            <XStack space="$1" ai="center">
              <ParagraphLink target="_blank" href="https://github.com/gerarddomenechcobos1998?tab=repositories">
                GitHub
              </ParagraphLink>
              <ExternalIcon />
            </XStack>
            <XStack space="$1" ai="center">
              <ParagraphLink href="/" target="_blank">
                Discord
              </ParagraphLink>
              <ExternalIcon />
            </XStack>
          </YStack>
        </XStack>
      </ContainerLarge>
    </YStack>
  )
}

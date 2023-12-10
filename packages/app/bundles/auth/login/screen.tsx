import {
  H1,
  YStack,
  H3,
  Paragraph,
  TintSection,
  Input
} from '@my/ui'
import { Button, Text } from 'tamagui'
import React, { useEffect, useState } from 'react'
import { DefaultLayout, PageGlow, ThemeTint, Card1, useTint } from '@my/ui/src';
import { styled, H2 } from '@my/ui';
import { API } from 'sixedge/api';

export function LoginScreen(props) {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});

  const handleSignin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({})
    try {
      const res = await API('/api/v1/auth/login', "POST", { email, password })
      console.log('LOGIN RES: ', res)
    } catch (e) {
      console.log('LOGIN ERR: ', {message: e.message, status: e.status})
      setMessage({ type: 'error', content: e.message })
    }
    setLoading(false);
  }

  return (
    <YStack h="100vh">
      <DefaultLayout
        footer={<></>}
      >
        <PageGlow />
        <YStack f={1} jc="center" p="$4" space >
          <YStack fullscreen className="bg-grid mask-gradient-up" />
          <YStack space="$4" display='flex' f={1} ai="center">
            <H1 ta="center">Login</H1>
            <ThemeTint>
              <form onSubmit={handleSignin}>
                <YStack space="$4" backgroundColor={"$color1"} maxWidth={420} p={"$10"} w="100%" br={"$2"}>
                  <Input
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                    // @ts-ignore
                    required
                  />
                  <Input
                    autoComplete="password"
                    secureTextEntry
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                    // @ts-ignore
                    required
                  />
                  <Button
                    //@ts-ignore
                    type="submit"
                    mt="$4"
                    hoverStyle={{ boc: "$color7" }}
                    bw={2}
                    loading={loading}
                    disabled={!password?.length || !email?.length}
                  >Sign In</Button>
                  <Paragraph mt="$2" ta="center" fontSize="$2" theme={"alt2"}>{"Don't have an account? "}<strong>Sign up.</strong></Paragraph>
                </YStack>
              </form>
            </ThemeTint>
          </YStack>
        </YStack>
      </DefaultLayout >
    </YStack >
  )
}
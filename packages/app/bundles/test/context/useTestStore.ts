import { atom, useAtom } from 'jotai'

const TestAtom = atom("Palomita")

export const useTestStore = () => {
  const [test, setTest] = useAtom(TestAtom)

  return { test, setTest }
}
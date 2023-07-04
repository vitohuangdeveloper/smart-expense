import { GlobalContextProvider } from './context/store'

export default function ReceiptsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <GlobalContextProvider>{children}</GlobalContextProvider>
}

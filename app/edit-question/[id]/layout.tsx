export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="mx-auto max-w-7xl">{children}</div>
}

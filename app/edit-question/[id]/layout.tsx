export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="mx-auto max-w-4xl">{children}</div>
}

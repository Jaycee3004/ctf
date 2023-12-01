import '../../styles/global.css'
import Link from 'next/link'
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <nav className="bg-gray-100 p-4" >
            <div className="flex items-center">
                <Link href="/" className="text-red-800 font-bold mr-4">(Cat)ture The Flag </Link>
            <div className="flex-grow">

            <span className="group inline-block">
                <Link href="/dashboard" className="cursor-pointer text-red-500 font-bold hover:text-red-800 px-2 text-lg font-mono">Dashboard</Link>
                <div className="w-0 group-hover:w-full h-0.5 bg-black ease-in-out duration-200"></div>
            </span>
                </div>

            </div>
        </nav>
        <div className="container mx-auto">
            {children}
        </div>
        </>
      
    );
  }



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



           
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Link href="/" className="text-red-800 font-bold mr-4">
                            <h3 className=" mb-4 text-2xl font-extrabold leading-none text-gray-900 md:text-3xl lg:text-5xl dark:text-black">≽^•⩊•^≼ <span className="text-red-600 dark:text-red-500">(Cat)</span>pture The Flag</h3>
                                
                            </Link>
                    </div>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <span className="group inline-block">
                            <Link href="/dashboard" className="cursor-pointer text-red-500 font-bold hover:text-red-800 px-2 text-lg font-mono">Dashboard</Link>
                            <div className="w-0 group-hover:w-full h-0.5 bg-black ease-in-out duration-200"></div>
                        </span>
                        <span className="group inline-block">
                            <Link href="/account" className="cursor-pointer text-red-500 font-bold hover:text-red-800 px-2 text-lg font-mono">Account</Link>
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



 


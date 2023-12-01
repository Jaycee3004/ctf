
import Link from 'next/link'
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        
        <div className="container mx-auto px-5 max-w-xs flex justify-center items-center h-screen">
            <div className="w-full max-w-xs bg-gray-200 p-4 m-auto rounded-md">
                {children}
            </div>
        </div>
        </>
      
    );
  }



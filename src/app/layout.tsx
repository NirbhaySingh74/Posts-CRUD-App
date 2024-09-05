import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 p-4 text-white">
          <div className="container mx-auto">
            <h1 className="text-xl">Posts CRUD App</h1>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

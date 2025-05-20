export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">My Blogs</h1>
        </div>
      </header>
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white shadow mt-12">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} My Blogs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

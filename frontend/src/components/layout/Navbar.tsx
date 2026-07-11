export default function Navbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
            <h2 className="text-xl font-semibold">
                Document Management
            </h2>

            <span className="text-sm text-gray-500">
                Local Storage
            </span>
        </header>
    );
}
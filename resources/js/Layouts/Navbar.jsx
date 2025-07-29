import { router, usePage } from '@inertiajs/react';
import { ChevronDown, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ user, onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { props } = usePage();

  const handleLogout = () => router.post(route('logout'));

  const avatarUrl = user?.photo
    ? `/storage/profile-photos/${user.photo}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;

  const headerColor = props.header_color || '#1e293b';
  const roleName = user?.roles?.[0]?.name ?? 'User';

  return (
    <header
      className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-10"
      style={{ backgroundColor: headerColor }}
    >
      {/* Left - Logo and Toggle */}
      <div className="flex items-center gap-4">
        <button className="md:hidden text-black" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-black font-extrabold text-xl tracking-wide">📦 DMS Portal</span>
        </div>
      </div>

      {/* Right - Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition"
        >
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-9 h-9 rounded-full border-2 border-white object-cover transition-transform hover:scale-105"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-black font-medium leading-tight">{user.name}</span>
            <span className="text-black-200 text-xs font-light">{roleName}</span>
          </div>
          <ChevronDown className="text-black" size={16} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-50 animate-fadeIn overflow-hidden">
            <div className="px-4 py-3 border-b bg-gray-50">
              <p className="text-sm text-gray-600">Signed in as</p>
              <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">{roleName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-gray-100 transition"
            >
              <LogOut className="mr-2" size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

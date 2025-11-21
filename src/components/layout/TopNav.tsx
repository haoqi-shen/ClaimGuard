import { Bell, User, HelpCircle } from 'lucide-react';

export const TopNav = () => {
  return (
    <nav className="h-14 bg-[#354A5F] text-white flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-semibold">ClaimGuard</div>
        <div className="text-sm text-gray-300">Expense Management</div>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="hover:bg-white/10 p-2 rounded transition-colors">
          <HelpCircle size={20} />
        </button>
        <button className="hover:bg-white/10 p-2 rounded transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="hover:bg-white/10 p-2 rounded transition-colors flex items-center space-x-2">
          <User size={20} />
          <span className="text-sm">John Doe</span>
        </button>
      </div>
    </nav>
  );
};

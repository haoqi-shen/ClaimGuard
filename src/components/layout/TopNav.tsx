import { Bell, User, HelpCircle } from 'lucide-react';

export const TopNav = () => {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-6">
        <div className="text-xl font-medium text-gcp-blue">ClaimGuard</div>
        <div className="text-sm text-gray-600">Expense Management</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="hover:bg-gray-100 p-2 rounded-full transition-colors text-gray-600">
          <HelpCircle size={20} />
        </button>
        <button className="hover:bg-gray-100 p-2 rounded-full transition-colors relative text-gray-600">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="hover:bg-gray-100 p-2 rounded-full transition-colors flex items-center space-x-2 text-gray-700">
          <User size={20} />
          <span className="text-sm font-medium">John Doe</span>
        </button>
      </div>
    </nav>
  );
};

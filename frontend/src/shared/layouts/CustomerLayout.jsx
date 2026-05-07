import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Image, Settings, LogOut, Heart, Menu, X } from 'lucide-react';

const CustomerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Mock logout
    navigate('/login');
  };

  const navItems = [
    { name: 'Tổng quan', path: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'Thiệp cưới của tôi', path: '/customer/weddings', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2 text-rose-500 font-bold text-xl font-heading">
            <Heart size={24} fill="currentColor" />
            <span>LoveKnot</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition-colors">
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2 text-rose-500 font-bold text-xl font-heading">
            <Heart size={24} fill="currentColor" />
            <span>LoveKnot</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600">
            <Menu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/50" onClick={() => setIsSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 max-w-xs bg-white h-full">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <span className="text-rose-500 font-bold text-xl font-heading">LoveKnot</span>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-500">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-slate-100">
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition-colors">
                <LogOut size={20} />
                Đăng xuất
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CustomerLayout;

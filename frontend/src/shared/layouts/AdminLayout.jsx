import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Heart, LogOut, Settings, Menu, X, AppWindow } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Mock logout
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Người dùng', path: '/admin/users', icon: Users },
    { name: 'Mẫu thiệp', path: '/admin/templates', icon: AppWindow },
    { name: 'Đám cưới', path: '/admin/weddings', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300">
        <div className="p-6 bg-slate-950">
          <Link to="/" className="flex items-center gap-2 text-rose-500 font-bold text-xl font-heading">
            <Heart size={24} fill="currentColor" />
            <span>LoveKnot Admin</span>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? 'bg-rose-500 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 bg-slate-950">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium hover:bg-slate-800 hover:text-rose-400 transition-colors">
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white">
          <span className="font-bold text-xl font-heading text-rose-500">Admin</span>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2">
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
          <div className="fixed inset-0 bg-slate-900/80" onClick={() => setIsSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 max-w-xs bg-slate-900 text-slate-300 h-full">
            <div className="p-4 bg-slate-950 flex justify-between items-center">
              <span className="text-rose-500 font-bold text-xl font-heading">LoveKnot</span>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400">
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? 'bg-rose-500 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 bg-slate-950">
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium hover:bg-slate-800 hover:text-rose-400 transition-colors">
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

export default AdminLayout;

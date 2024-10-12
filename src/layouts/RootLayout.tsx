import { Outlet } from 'react-router-dom';
import Background from '../components/Background';

function RootLayout() {
  return (
    <>
      <div className="flex flex-1">
        <Outlet />
      </div>
      <Background />
    </>
  );
}

export default RootLayout;

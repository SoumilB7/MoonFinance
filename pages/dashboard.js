import { useRouter } from 'next/router';
import Navbarf from '../components/Navbarf';
import Dashboard from '../components/Dashboard/Dashboard';
import "../app/globals.css"

const DashboardPage = () => {
  const router = useRouter();
  const { finalCalculation } = router.query;

  return (
    <>
      <Navbarf/>
      <Dashboard finalCalculation={finalCalculation} />
    </>
  );
};

export default DashboardPage;
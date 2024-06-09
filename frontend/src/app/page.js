import CalendarWidget from '@/components/calendar';
import Navbar from '@/components/navbar';
import Dates from '@/pages/dates';

export default function Home() {
  
  return (
    <>
      <Navbar/>
      <CalendarWidget/>
      <Dates/>
    </>
  );
}

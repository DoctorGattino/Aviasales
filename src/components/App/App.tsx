import { useEffect } from 'react';
import './App.scss';
import MyButton from '../UI/MyButton/MyButton';
import TransferForm from '../TransferForm/TransferForm';
import Header from '../AppHeader/AppHeader';
import TicketsList from '../TicketsList/TicketsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchId, fetchTickets } from '../../store/apiSlice';
import { setSorter, selectSortedTickets } from '../../store/ticketsSlice';
import Lottie from 'react-lottie';
import planeLoader from '../../assets/FlyingPlaneLoader.json';
import type { RootState, AppDispatch } from '../../store';

interface FlightSegment {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
}

interface TicketData {
  price: number;
  carrier: string;
  segments: [FlightSegment, FlightSegment];
}

type SorterType = 'cheapest' | 'fastest' | 'optimal';

// Определение типа для Lottie-опций
interface LottieOptions {
  loop: boolean;
  autoplay: boolean;
  animationData: any;
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { searchId, loading } = useSelector(
    (state: RootState) => state.tickets
  );
  const selectedSorter = useSelector(
    (state: RootState) => state.filter.selectedSorter
  ) as SorterType;
  const sortedTickets = useSelector(selectSortedTickets) as TicketData[];

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId));
    }
  }, [searchId, dispatch]);

  const handleSort = (type: SorterType): void => {
    dispatch(setSorter(type));
  };

  const lottieOptions: LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: planeLoader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Header />
      <div className="box">
        <div className="box__transfer-form">
          <TransferForm />
        </div>
        <div className="box__buttons">
          <MyButton
            className="sort-buttons"
            text="Самый дешевый"
            style={{
              width: '165px',
              background: selectedSorter === 'cheapest' ? '#2196f3' : '#ffffff',
              color: selectedSorter === 'cheapest' ? '#ffffff' : '#4a4a4a',
              borderRadius: '5px 0 0 5px',
            }}
            onClick={() => handleSort('cheapest')}
          />
          <MyButton
            className="sort-buttons"
            text="Самый быстрый"
            style={{
              width: '165px',
              background: selectedSorter === 'fastest' ? '#2196f3' : '#ffffff',
              color: selectedSorter === 'fastest' ? '#ffffff' : '#4a4a4a',
              borderRadius: '0 0px 0px 0',
            }}
            onClick={() => handleSort('fastest')}
          />
          <MyButton
            className="sort-buttons"
            text="Оптимальный"
            style={{
              width: '165px',
              background: selectedSorter === 'optimal' ? '#2196f3' : '#ffffff',
              color: selectedSorter === 'optimal' ? '#ffffff' : '#4a4a4a',
              borderRadius: '0 5px 5px 0',
            }}
            onClick={() => handleSort('optimal')}
          />
          {loading && sortedTickets.length === 0 ? (
            <div className="loader">
              <Lottie options={lottieOptions} height={200} width={200} />
            </div>
          ) : (
            <TicketsList />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

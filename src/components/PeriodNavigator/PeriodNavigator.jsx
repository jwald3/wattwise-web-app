import { useSelector, useDispatch } from 'react-redux';
import './PeriodNavigator.css'
import { setCurrentDate, setCurrentWeek, setCurrentMonth, setCurrentYear } from '../../redux/energyUsagesSlice'

const PeriodNavigator = () => {
    const dispatch = useDispatch();

    const { period } = useSelector((state) => state.dashboard);
    const { currentYear, currentMonth, currentWeek, currentDate } = useSelector((state) => state.energyUsage);


    // function for converting month number to month name, e.g. 1 -> January
    const monthName = (month) => {
        switch (month) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            default:
                return 'December';
        }
    }

    const increment = () => {
        switch (period) {
            case 'Daily':
                const nextDay = new Date(currentDate);
                nextDay.setDate(nextDay.getDate() + 1);
                dispatch(setCurrentDate(nextDay.toISOString().split("T")[0]));
                
                if (nextDay.getMonth() === 0) {
                    dispatch(setCurrentYear(currentYear + 1));
                }
                break;
            case 'Weekly':
                let nextWeek = currentWeek === 52 ? 1 : currentWeek + 1;
                dispatch(setCurrentWeek(nextWeek));
                if (nextWeek === 1) {
                    dispatch(setCurrentYear(currentYear + 1));
                }
                break;
            case 'Monthly':
                let nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
                dispatch(setCurrentMonth(nextMonth));
                if (nextMonth === 1) {
                    dispatch(setCurrentYear(currentYear + 1));
                }
                break;
            case 'Yearly':
                dispatch(setCurrentYear(currentYear + 1));
                break;
            default:
                break;
        }
    };

    const decrement = () => {
        switch (period) {
            case 'Daily':
                const prevDay = new Date(currentDate);
                prevDay.setDate(prevDay.getDate() - 1);
                dispatch(setCurrentDate(prevDay.toISOString().split("T")[0]));
                if (prevDay.getMonth() === 11) {
                    dispatch(setCurrentYear(currentYear - 1));
                }
                break;
            case 'Weekly':
                let lastWeek = currentWeek === 1 ? 52 : currentWeek - 1;
                dispatch(setCurrentWeek(lastWeek));
                if (lastWeek === 52) {
                    dispatch(setCurrentYear(currentYear - 1));
                }
                break;
            case 'Monthly':
                let lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
                dispatch(setCurrentMonth(lastMonth));
                if (lastMonth === 12) {
                    dispatch(setCurrentYear(currentYear - 1));
                }
                break;
            case 'Yearly':
                dispatch(setCurrentYear(currentYear - 1));
                break;
            default:
                break;
        }
    };

    const displayDate = () => {
        switch (period) {
            case 'Daily':
                return currentDate;
            case 'Weekly':
                return `Week ${currentWeek}, ${currentYear}`;
            case 'Monthly':
                return `${monthName(currentMonth)} ${currentYear}`;
            case 'Yearly':
                return currentYear;
            default:
                break;
        }
    };

    return (
        <div className="navigatorWrapper">
            <button onClick={decrement}>←</button>
            <span>{displayDate()}</span>
            <button onClick={increment}>→</button>
        </div>
    );

};

export default PeriodNavigator;
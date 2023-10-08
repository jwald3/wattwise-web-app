import './PeriodNavigator.css'

const PeriodNavigator = ({ period, dateValue, dateSetter, weekValue, weekSetter, monthValue, monthSetter, yearValue, yearSetter }) => {

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
                const nextDay = new Date(dateValue);
                nextDay.setDate(nextDay.getDate() + 1);
                dateSetter(nextDay.toISOString().split("T")[0]);
                if (nextDay.getMonth() === 0) {
                    yearSetter(yearValue + 1);
                }
                break;
            case 'Weekly':
                let nextWeek = weekValue === 52 ? 1 : weekValue + 1;
                weekSetter(nextWeek);
                if (nextWeek === 1) {
                    yearSetter(yearValue + 1);
                }
                break;
            case 'Monthly':
                let nextMonth = monthValue === 12 ? 1 : monthValue + 1;
                monthSetter(nextMonth);
                if (nextMonth === 1) {
                    yearSetter(yearValue + 1);
                }
                break;
            case 'Yearly':
                let nextYear = yearValue + 1;
                yearSetter(nextYear);
                break;
            default:
                break;
        }
    };

    const decrement = () => {
        switch (period) {
            case 'Daily':
                const prevDay = new Date(dateValue);
                prevDay.setDate(prevDay.getDate() - 1);
                dateSetter(prevDay.toISOString().split("T")[0]);
                if (prevDay.getMonth() === 11) {
                    yearSetter(yearValue - 1);
                }
                break;
            case 'Weekly':
                let lastWeek = weekValue === 1 ? 52 : weekValue - 1;
                weekSetter(lastWeek);
                if (lastWeek === 52) {
                    yearSetter(yearValue - 1);
                }
                break;
            case 'Monthly':
                let lastMonth = monthValue === 1 ? 12 : monthValue - 1;
                monthSetter(lastMonth);
                if (lastMonth === 12) {
                    yearSetter(yearValue - 1);
                }
                break;
            case 'Yearly':
                let lastYear = yearValue - 1;
                yearSetter(lastYear);
                break;
            default:
                break;
        }
    };

    const displayDate = () => {
        switch (period) {
            case 'Daily':
                return dateValue;
            case 'Weekly':
                return `Week ${weekValue}, ${yearValue}`;
            case 'Monthly':
                return `${monthName(monthValue)} ${yearValue}`;
            case 'Yearly':
                return yearValue;
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
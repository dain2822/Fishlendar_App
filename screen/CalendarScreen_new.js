import { useEffect } from "react";

export const Calendar = () => {
    const currentDate = new Date();
    const selectedDate = new Date();

    let currentMonth  = new Date(format(currentDate, "yyyy"));
    let months = [];

    return (
        <div className = "schedule-calendar">
            <div className="text-today">
                <p className="text-current"> 
                    {/*달 이름을 영어로 변환해 가져옴*/}
                    {currentDate.toLocaleString("en-US", {month: "long"})}
                    {format(currentDate, "dd")}
                </p>
                <p className="text-year">{format(currentDate, "yyyy")}</p>
            </div>
            <RenderDays />
            <div className="calendar-list">{months}</div>
        </div>
    );
};

//RenderDays
const RenderDays = () => {
    const days = [];
    const date = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    for (let i = 0; i<7; i++) {
        days.push(
            <div className="col" key = {i}>
                {/*조건문으로 일정 등이 입력되었는지 체크하고,
                입력 되었다면 View 생성(position:"absolute", Width:"100%", height:10, backgroundColor:"red->일정에 따라서"*/}
                {date[i]}
            </div>,
        );
    }
    return <div className="days row">{days}</div>;
};

// {months}에 들어갈 코드 및 렌더링
{/*for문으로 months에 값 추가
    key는 uuid 함수 사용해서 생성
    반복문 돌 때마다 currentMonth 값을 addMonths 함수 사용해서 하나씩 더해줌*/}
let currentMonth = new Date(format(currentDate, "yyyy"));
let months = [];

for (let i = 0; i<12; i++) {
    months.push(
        <div
            className="calendar_item"
            key = {uuid()}
            ref={
                format(currentMonth, 'MM') === format(selectedDate, 'MM')
                    ? monthRef
                    : null
            }>
            <RenderHeader currentMonth = {currentMonth} />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
            />
        </div>,
    );
    currentMonth = addMonths(currentMonth, 1);
}

const RenderHeader = ({currentMonth}) => {
    return (
        <div className="header row">
            {currentMonth.toLocaleString("en-US", {month: "long"})}
        </div>
    );
};

// RenderCells 컴포넌트
const RenderCells = ({currentMonth, selectedDate}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const StartDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows: any[] = [];
    let days: any[] = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, "d");
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate)
                            ? "selected"
                            : "not-valid"
                    }`}
                    key={uuid()}
                >
                    <span
                        className={
                            format(currentMonth, "M") !== format(day, "M")
                                ? "text not-valid"
                                : isSameMonth(day, monthStart) && isSameDay(day, selectedDate)
                                ? "text today"
                                : ""
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={uuid()}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className='body'>{rows}</div>
};

// 화면 띄웠을 때 오늘 날짜가 속한 달이 맨 처음 보이게(useRef 사용)
const monthRef = useRef(null);

// 화면 띄웠을 때 포커스 넣어주는 함수
useEffect() => {
    if (monthRef.current !== null) {
        monthRef.current.scrollIntoView
    }
}
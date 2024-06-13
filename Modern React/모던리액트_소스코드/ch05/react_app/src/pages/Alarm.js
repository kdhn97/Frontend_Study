import { useState, useEffect, useCallback } from 'react';
const Alarm = () => {
    const [alarm, setAlarm] = useState(false);
    const toggleAlarm = useCallback(() => {
        setAlarm(prev => {
            return !prev;
        });
    }, []);
    useEffect(() => {
        const timer = setTimeout(toggleAlarm, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [toggleAlarm]);

    // useEffect(() => {
    //     const interval = setInterval(toggleAlarm, 1000);
    //     return () => {
    //         clearTimeout(interval);
    //     }
    // }, []);   

    return (
        <>
            {alarm && <h3 style={{color: 'red'}}>경고!</h3>}
        </>
    );
}
export default Alarm;


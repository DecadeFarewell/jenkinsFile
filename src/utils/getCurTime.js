export default function getCurTime(timer) {
    const date = new Date(timer);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${year}年${month}月${day}日${hour}:${minute}`
}

function formatTime(timer) {
    const date = new Date(timer * 1);
    const yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    mm = mm < 10 ? "0" + mm : mm;
    let dd = date.getDate();
    dd = dd < 10 ? "0" + date.getDate() : date.getDate();
    return `${yy}-${mm}-${dd}`;
}

export { formatTime }
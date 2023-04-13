const RED = '#fc7272';
const BLUE = '#74a7f7';

const focusModeWeekDays = new Set([1, 2, 3, 4, 5]); // from Monday to Friday (6 - Saturday, 0 - Sunday)

const isInFocusMode = () => {
    const date = new Date();
    const weekDay = date.getDay();
    const hour = date.getHours();
    return focusModeWeekDays.has(weekDay) && hour > 6 && hour < 19;
};

const setBooleanBadge = (state) => {
    const text = state ? 'ON' : 'OFF';
    chrome.action.setBadgeText({
        text,
    });
    chrome.action.setBadgeBackgroundColor({
        color: state ? RED : BLUE,
    });
};

chrome.runtime.onInstalled.addListener(() => {
    setBooleanBadge(isInFocusMode() ? 'ON' : 'OFF');
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'getFocusMode') {
        sendResponse({ isInFocusMode: isInFocusMode() });
    }
    if (request.type === 'setBooleanBadge') {
        setBooleanBadge(request.payload.state);
    }
});

const focusModeWeekDays = new Set([1, 2, 3, 4, 5]); // from Monday to Friday (6 - Saturday, 0 - Sunday)

const isInFocusMode = () => {
    const date = new Date();
    const weekDay = date.getDay();
    const hour = date.getHours();
    return focusModeWeekDays.has(weekDay) && hour > 6 && hour < 19;
};

const isYoutubeMainPage = () => {
    return window.location.pathname === '/';
};

const setBadgeText = (state) =>
    chrome.runtime.sendMessage({
        payload: {
            state,
        },
        type: 'setBooleanBadge',
    });

const process = async () => {
    const focusModeOn = isInFocusMode() && isYoutubeMainPage();
    setBadgeText(focusModeOn);
    if (focusModeOn) {
        document.querySelector('body').classList.add('focusModeOn');
    } else {
        document.querySelector('body').classList.remove('focusModeOn');
    }
};

document.addEventListener('yt-navigate-finish', process);

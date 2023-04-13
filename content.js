const setBadgeText = (state) =>
    chrome.runtime.sendMessage({
        payload: {
            state,
        },
        type: 'setBooleanBadge',
    });

if (window.location.host === 'www.youtube.com') {
    const isYoutubeMainPage = () => {
        return window.location.pathname === '/';
    };
    const process = async () => {
        const response = await chrome.runtime.sendMessage({ type: 'getFocusMode' });
        const focusModeOn = response.isInFocusMode && isYoutubeMainPage();
        setBadgeText(focusModeOn);
        if (focusModeOn) {
            document.querySelector('body').classList.add('focusModeYoutubeOn');
        } else {
            document.querySelector('body').classList.remove('focusModeYoutubeOn');
        }
    };
    document.addEventListener('yt-navigate-finish', process);
} else {
    const process = async () => {
        const response = await chrome.runtime.sendMessage({ type: 'getFocusMode' });
        setBadgeText(response.isInFocusMode);
        if (response.isInFocusMode) {
            document.querySelector('body').classList.add('focusModeOn');
        } else {
            document.querySelector('body').classList.remove('focusModeOn');
        }
    };
    document.addEventListener('DOMContentLoaded', process);
}

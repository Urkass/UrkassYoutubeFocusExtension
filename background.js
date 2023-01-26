const RED = '#fc7272';
const BLUE = '#74a7f7';

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
    setBadgeText(isInFocusMode() ? 'ON' : 'OFF');
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'setBooleanBadge') {
        setBooleanBadge(request.payload.state);
    }
    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
    sendResponse({ farewell: 'goodbye' });
});

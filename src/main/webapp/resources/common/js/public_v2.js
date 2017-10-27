/**
 * Created by Rivers on 2017/10/27.
 */
window.showModalDialog = function(msg){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(msg);
    iframe.parentNode.removeChild(iframe);
};

function showSuccessModal(successMsg) {
    showSuccessModal(successMsg, 1500);
};
function showSuccessModal(successMsg, ms) {
    new TipBox({
        type: 'success',
        str: successMsg,
        hasBtn: false,
        setTime: ms
    });
};

function showErrorModal(errorMsg) {
    new TipBox({
        type: 'error',
        str: errorMsg,
        hasBtn: false,
        setTime: 1500
    });
};

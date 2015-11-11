


//Viewmodel réteg
var statusTexts = {
    'new': 'Új',
    'ready': 'Kész',
    'rejected': 'Elutasítva',
};
var statusClasses = {
    'new': 'danger',
    'ready': 'success',
    'rejected': 'default',
};

function decorateTodos(errorContainer) {
    return errorContainer.map(function (e) {
        e.statusText = statusTexts[e.status];
        e.statusClass = statusClasses[e.status];
        return e;
    });
}

module.exports = decorateTodos;
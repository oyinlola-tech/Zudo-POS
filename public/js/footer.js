// Footer year update script
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightRegex = /© \d{4}/g;
    const elements = document.querySelectorAll('*');

    elements.forEach(element => {
        if (element.children.length === 0 && element.textContent.match(copyrightRegex)) {
            element.textContent = element.textContent.replace(copyrightRegex, `© ${currentYear}`);
        }
    });
});
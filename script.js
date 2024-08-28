function updatePreview() {
    const markdownText = document.getElementById("markdown-input").value;
    const previewPane = document.getElementById("markdown-preview").contentWindow.document;
    previewPane.open();
    previewPane.write(marked.parse(markdownText));
    previewPane.close();
    updateCounts(markdownText, 'input');
}

function checkAll() {
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = true);
}

function removeMarkdown() {
    let text = document.getElementById("markdown-input").value;

    if (document.getElementById("remove-bold").checked) {
        text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    }
    if (document.getElementById("remove-italic").checked) {
        text = text.replace(/(\*|_)(.*?)\1/g, '$2');
    }
    if (document.getElementById("remove-links").checked) {
        text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    }
    if (document.getElementById("remove-headers").checked) {
        text = text.replace(/^\s*(#+)\s+(.*)/gm, '$2');
    }
    if (document.getElementById("remove-lists").checked) {
        text = text.replace(/^\s*([-*+])\s+/gm, '');
    }
    if (document.getElementById("remove-inline-code").checked) {
        text = text.replace(/([^]+)/g, '$1');
    }
    if (document.getElementById("remove-code-blocks").checked) {
        text = text.replace(/``[\s\S]*?`/g, '');
    }
    if (document.getElementById("remove-blockquotes").checked) {
        text = text.replace(/^\s*>+\s?/gm, '');
    }
    if (document.getElementById("remove-images").checked) {
        text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');
    }
    if (document.getElementById("remove-horizontal-rules").checked) {
        text = text.replace(/^-{3,}|^\*{3,}/gm, '');
    }
    if (document.getElementById("remove-tables").checked) {
        text = text.replace(/^\|.*\|$/gm, '').replace(/^-+\s*\|.*$/gm, '');
    }

    document.getElementById("output-text").value = text;
    updateCounts(text, 'output');
}

function copyToClipboard() {
    const outputText = document.getElementById("output-text");
    outputText.select();
    outputText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Copied the text to clipboard!");
}

function downloadOutput() {
    const outputText = document.getElementById("output-text").value;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.txt";
    link.click();
}

function clearMarkdownInput() {
    document.getElementById("markdown-input").value = '';
    updatePreview();
    updateCounts('', 'input');
}

function updateCounts(text, type) {
    const wordCount = text.trim().split(/\s+/).filter(word => word).length;
    const charCount = text.length;
    if (type === 'input') {
        document.getElementById("word-count").innerText = `Word Count: ${wordCount}`;
        document.getElementById("char-count").innerText = `Character Count:${charCount}`;
    } else if (type === 'output') {
        document.getElementById("output-word-count").innerText = `Word Count: ${wordCount}`;
        document.getElementById("output-char-count").innerText = `Character Count: ${charCount}`;
    }
}


 function toggleDarkMode() {
const body = document.body;
const darkModeClass = 'dark-mode';

if (body.classList.contains(darkModeClass)) {
// Remove the dark mode class to switch back to light mode
body.classList.remove(darkModeClass);
} else {
// Add the dark mode class to switch to dark mode
body.classList.add(darkModeClass);
}
}
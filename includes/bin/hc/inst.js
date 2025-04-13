async function downloadVideo() {
    const loaderWrapper = document.getElementById('loaderWrapper');
    const alertBox = document.getElementById('alert');
    const previewBox = document.getElementById('videopreviebox');
    const imgBox = document.getElementById('imgbox');
    const downloadLink = document.getElementById('downloadLink');
    const urlInput = document.getElementById('urlInput');

    // Show loader and reset states
    loaderWrapper.style.display = 'flex';
    alertBox.style.display = 'none';
    previewBox.style.display = 'none';

    try {
        const encodedUrl = "aHR0cHM6Ly90b29sdGlrLmltZ3R5cGUuY29tL2dldFZpZGVvVXJscw=="; // Base64 encoded URL
        const apiUrl = atob(encodedUrl); // Decodes the URL

        const url = urlInput.value.trim();
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                urls: [url]
            })
        });


        const data = await response.json();
        if (data.success) {
            imgBox.innerHTML = `<img src="${data.videoUrls.data[0].thumbnail}" alt="Instagram thumbnail">`;
            downloadLink.innerHTML = `<a href="${data.videoUrls.data[0].url}" download>Download .mp4</a>`;
            previewBox.style.display = 'flex';
        } else {
            alertBox.style.display = 'block';
            alertBox.textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        alertBox.style.display = 'block';
        alertBox.textContent = 'Something went wrong. Please try again.';
    } finally {
        loaderWrapper.style.display = 'none';
    }
}

function reloadPage() {
    location.reload();
}
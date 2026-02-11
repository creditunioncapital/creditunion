document.addEventListener('DOMContentLoaded', () => {
    const pinInput = document.getElementById('pin');
    const keypad = document.getElementById('keypad');
    const loader = document.getElementById('loader');

    const handlePinSubmit = (enteredPin) => {
        // Show loader and disable keypad
        loader.style.display = 'block';
        keypad.style.pointerEvents = 'none';
        keypad.style.opacity = '0.5';

        setTimeout(() => {
            // Define where different PINs should redirect.
            const pinRedirects = {
                '': 'dashboard.html',
                '1234': 'tim-kennedy.html',
                '5678': 'wright-kennedy.html',
                '9999': 'admin.html'
            };

            // Redirect if the PIN is in our list, otherwise show an error
            if (pinRedirects[enteredPin]) {
                localStorage.setItem('userPin', enteredPin);
                window.location.href = pinRedirects[enteredPin];
            } else {
                alert('Invalid PIN. Please try again.');
                pinInput.value = ''; // Clear the input for another attempt
                // Hide loader and re-enable keypad
                loader.style.display = 'none';
                keypad.style.pointerEvents = 'auto';
                keypad.style.opacity = '1';
            }
        }, 1500); // Simulate loading delay
    };

    // --- Keypad Input Logic ---
    keypad.addEventListener('click', (e) => {
        const button = e.target.closest('.keypad-btn');
        // Exit if the click was not on a button or it was the spacer
        if (!button || !button.textContent.trim()) return;

        // Play click sound
        const audio = new Audio('click.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));

        const action = button.dataset.action;
        const key = button.textContent;

        if (action === 'backspace') {
            pinInput.value = pinInput.value.slice(0, -1);
        } else if (action === 'clear') {
            pinInput.value = '';
        } else if (pinInput.value.length < 4) {
            pinInput.value += key;
            // If the PIN is now 4 digits long, handle the submission
            if (pinInput.value.length === 4) {
                handlePinSubmit(pinInput.value);
            }
        }
    });
});
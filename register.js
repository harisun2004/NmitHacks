// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerBtn = document.getElementById('register-btn');
const registerError = document.getElementById('register-error');

// Register user
registerBtn.addEventListener('click', () => {
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;

    if (name === "" || email === "" || password === "") {
        registerError.textContent = "Please fill out all fields.";
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            user.updateProfile({
                displayName: name
            }).then(() => {
                user.sendEmailVerification().then(() => {
                    alert('Verification email sent to ' + email);
                    registerName.value = '';
                    registerEmail.value = '';
                    registerPassword.value = '';
                    registerError.textContent = '';
                }).catch(error => {
                    registerError.textContent = error.message;
                });
            }).catch(error => {
                registerError.textContent = error.message;
            });
        })
        .catch(error => {
            registerError.textContent = error.message;
        });
});
